const Repair = require("../../models/Repair");
const User = require("../../models/User");
const RepairHistory = require("../../models/RepairHistory");

const REPAIR_INDEX = process.env.search_index;
const MAX_BACKUPS = Number(process.env.max_repair_backups ?? 3);

const getRepairsforUser = async (req, res) => {
  const user = req.user;
  const { limit, page } = req.query;

  const limitResults = Number(limit) > 0 ? Number(limit) : 10;
  const currentPage = page ? Number(page) : 0;
  const skipResults = limitResults > 0 ? Number(limitResults * currentPage) : 0;

  try {
    //!new aggreate
    const aggregateResults = await Repair.aggregate([
      {
        //get only users repairs
        $match: {
          removed: false,
          createdBy: user._id.toString(),
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        //create metadata to include total from previous stage
        $facet: {
          metaData: [{ $count: "totalByUser" }],
          results: [{ $skip: skipResults }, { $limit: limitResults }],
        },
      },
    ]);

    const metaData =
      aggregateResults[0]?.metaData && aggregateResults[0]?.metaData.length > 0
        ? aggregateResults[0].metaData[0]
        : undefined;

    res.status(200).json({
      results: aggregateResults[0].results,
      totalByUser: metaData ? metaData?.totalByUser : 0,
      currentPage,
      limitResults,
    });
  } catch (error) {
    console.error("error getting users repairs");
    res.status(401).json({
      message: `error getting repairs for user:`,
      error,
    });
  }

  // get paremeter from url
  // const repairId = req.params.id;
  // try {
  //   const repairObj = await Repair.findOne({ _id: repairId }).lean();
  //   res.status(200).json(repairObj);
  // } catch (err) {
  //   res.status(400).json({
  //     message: `error getting repair by ID: ${repairId}`,
  //     error: err,
  //   });
  // }
};

const getRepairById = async (req, res) => {
  // get paremeter from url
  const repairId = req.params.id;
  try {
    const repairObj = await Repair.findOne({ _id: repairId }).lean();
    res.status(200).json(repairObj);
  } catch (err) {
    res.status(400).json({
      message: `error getting repair by ID: ${repairId}`,
      error: err,
    });
  }
};

const addRepair = async (req, res) => {
  const { title, boardType, engineMake, procedureArr, searchTags, group } =
    req.body.repairData;

  const createdBy = req.user._id;
  const groupId = group; //TODO check group allowed or not

  try {
    const entry = {
      procedureArr,
      searchTags,
      title,
      boardType,
      engineMake,
      createdBy,
      removed: false,
      group: groupId,
    };

    const response = await Repair.create(entry);

    const repairId = response._id; //add link to repair

    res.send({
      message: "repair added successfully",
      result: entry,
      repairId,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "failed to save repair", error: error.message });
  }
};

//get a number of newest repairs
const getNewestRepairs = async (req, res) => {
  try {
    // console.log(`controller repair.getNewestRepairs`);
    // console.log(`number of repairs requested`, req.params.num);
    const numRepairs = req.query.num ? req.query.num : 8;

    const userGroups = ["public"];

    // console.log("req.params", req.query.num);
    //retrieve certain number of repairs that have not been removed
    const results = await Repair.find({
      removed: { $ne: true },
      $or: [
        { visibility: "public" },
        ...userGroups.map((groupName) => ({
          group: { $regex: groupName, $options: "i" },
        })),
      ],
    })
      .sort({ _id: -1 })
      .limit(numRepairs);
    console.log(`number of repairs returned`, results.length);

    res.json({
      repairs: results,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed get repairs", error: error.message });
  }
};

const updateRepair = async (req, res) => {
  let previousData; //hold original before update
  const maxBackups = MAX_BACKUPS;
  try {
    const updatedDoc = req.body.repairData;
    const filter = { _id: updatedDoc._id };
    updatedDoc.boardType = updatedDoc.boardType.toUpperCase();

    //update document
    try {
      previousData = await Repair.findOneAndUpdate(filter, updatedDoc, {
        new: false, //return data before update
      });
    } catch (err) {
      res.status(400).json({
        message: `ID: ${updatedDoc._id}  NOT FOUND for edit`,
        error: err?.message,
      });
      return;
    }

    //backup original to history
    try {
      await RepairHistory.create({
        repairId: previousData._id,
        data: previousData,
      });
    } catch (err) {
      console.log("failed to backup original after update");
    }

    //clean up older versions if any
    //no need to await response not needed for api request
    enforceMaxDocuments(previousData._id, RepairHistory, maxBackups);

    res
      .status(200)
      .json({ message: "repair update", status: "success", updatedDoc });
  } catch (error) {
    res.status(400).json({
      message: `failed to update document: ${updatedDoc._id}`,
      error: error.message,
    });
  }
};

//soft delete post
const deleteRepair = async (req, res) => {
  const userId = String(req.user._id);
  const repairId = req.query.id;

  try {
    //TODO create utility to verify allowed or not allowed actions
    const user = await User.findOne({ _id: userId });
    const repairData = await Repair.findById({ _id: repairId });

    if (user.role === "admin" || repairData.createdBy === userId) {
      repairData.removed = true;
      await repairData.save();

      res.json({ removed: repairData });
    } else {
      throw new Error(`user: ${user.username} not allowed`);
    }
  } catch (error) {
    res.send({
      err: "delete error ID: " + repairId,
      message: error.message,
    });
  }
};

//retrieve repairs matching query
const searchRepairs = async (req, res) => {
  try {
    console.log(`repairsController.searchRepairs`, req.body);
    const searchStr = req.body.searchPhrase;
    const limit = Number(req.body.limit) || 10;
    const results = await Repair.aggregate([
      {
        $search: {
          index: REPAIR_INDEX,
          text: {
            query: searchStr,
            //   path:["title","searchtags","procedureArr","instructions"],
            path: { wildcard: "*" },
            fuzzy: { maxEdits: 2, prefixLength: 3 },
          },
        },
      },
    ]).limit(limit);
    res.json({ repairs: results });
  } catch (error) {
    res
      .status(400)
      .json({ message: "failed to get repairs", error: error.message });
  }
};

//!permanent delete
//const deletePost = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.user.username });
//     const report = await Repair.findById({ _id: req.params.id });

//     // if(user.role === 'admin' || report.createdBy === user.username ){
//     //     report.removed = true;
//     //     await report.save()
//     //     res.redirect('/repair/')
//     // }else{
//     //     console.log('user not allowed')
//     //     throw new Error(`user: ${user.username} not allowed`)
//     // }
//   } catch (error) {
//     res.send({
//       err: "delete error implemented ID: " + req.params.id,
//       message: error.message,
//     });
//   }
// };

async function enforceMaxDocuments(repairId, schema, maxBackups) {
  const backupLimit = maxBackups;
  try {
    // Find all documents with the given `repairId`, sorted by `createdAt`
    const backups = await schema.find({ repairId }).sort({
      createdAt: 1,
    });

    // Check if there are more than 3 documents
    if (backups.length > backupLimit) {
      // Calculate how many extra documents to delete
      const excessCount = backups.length - backupLimit;

      // Get the IDs of the oldest documents
      const idsToDelete = backups.slice(0, excessCount).map((doc) => doc._id);

      // Delete the excess documents
      await schema.deleteMany({ _id: { $in: idsToDelete } });

      // console.log(
      //   `${excessCount} old documents deleted for repairId: ${repairId}`
      // );
    }
  } catch (error) {
    console.error("Error enforcing max documents:", error);
  }
}

module.exports = {
  getRepairById,
  addRepair,
  getNewestRepairs,
  updateRepair,
  getRepairsforUser,
  searchRepairs,
  deleteRepair,
};
