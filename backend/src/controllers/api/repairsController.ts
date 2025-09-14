import type { Request, Response } from "express";
import RepairService from "../../services/RepairService.js";
import type { RepairT } from "../../services/RepairService.js";
import { get } from "http";
import Organization from "../../models/Organization.js";
import mongoose, { mongo } from "mongoose";
import { Repair } from "../../models/Repair.js";

const REPAIR_INDEX = process.env.search_index;
const MAX_BACKUPS = Number(process.env.max_repair_backups ?? 3);

const fetchUserRepairs = async (req: Request, res: Response) => {
  // @ts-expect-error
  const userId = req.user.id;

  const limit = req.query.limit || 10;
  const currentPage = req.query.page || 1;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const repairs = await RepairService.getUserRepairs(
    userId,
    Number(req.query.limit),
    Number(req.query.page)
  );

  res.status(200).json({
    results: repairs,
    currentPage: Number(req.query.page) || 1,
    limitResults: Number(req.query.limit) || 10,
  });
};

const getRepairById = async (req: Request, res: Response) => {
  // get paremeter from url
  const repairId = req.params.id;

  //@ts-expect-error
  const organization = req.user.organization;

  if (!organization) {
    res.status(400).json({ message: "no organization ID provided" });
    return;
  }

  if (!repairId) {
    res.status(400).json({ message: "no repair ID provided" });
    return;
  }
  try {
    const repairObj = await RepairService.getRepairById(repairId, organization);
    res.status(200).json(repairObj);
  } catch (err) {
    res.status(400).json({
      message: `error getting repair by ID: ${repairId}`,
      error: err,
    });
  }
};

const addRepair = async (req: Request, res: Response) => {
  const { title, manufacturer, engineMake, procedures, category } =
    req.body.repairData;

  // @ts-expect-error
  const createdBy = req.user._id;
  // @ts-expect-error
  const organization = req.user.organization;

  if (!organization || !createdBy) {
    res.status(400).json({ message: "no organization ID or user ID provided" });
    return;
  }

  try {
    const entry: RepairT = {
      procedures,
      category,
      title,
      manufacturer,
      createdBy: new mongoose.Types.ObjectId(createdBy),
      status: "pending",
      removed: false,
      organization: new mongoose.Types.ObjectId(organization),
    };

    const response = await RepairService.createRepair(entry);

    const repairId = response._id; //add link to repair

    res.status(201).send({
      message: "repair added successfully",
      repair: entry,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "failed to save repair", error: error.message });
  }
};

//get a number of newest repairs
const getNewestRepairs = async (req: Request, res: Response) => {
  // @ts-expect-error
  const organization = req.user.organization;
  try {
    const numRepairs = req.query.num ? Number(req.query.num) : 8;

    //retrieve certain number of repairs that have not been removed
    const results = await RepairService.getLatestRepairs(
      numRepairs,
      1,
      organization
    );
    // console.log(`number of repairs returned`, results.length);

    res.json(results);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "failed get repairs", error: error.message });
  }
};

const updateRepair = async (req: Request, res: Response) => {
  const id = req.body.id;
  const updateData: Partial<RepairT> = req.body.repairData;
  if (!id) throw new Error("no id provided");
  try {
    const updatedDoc = await RepairService.updateRepair(id, updateData);

    res
      .status(200)
      .json({ message: "repair update", status: "success", updatedDoc });
  } catch (error: any) {
    res.status(400).json({
      message: `failed to update document: ${id}`,
      error: error.message,
    });
  }
};

//soft delete post
const deleteRepair = async (req: Request, res: Response) => {
  // @ts-expect-error
  const userId = String(req.user._id);
  const repairId = String(req.query.id);

  if (!repairId) {
    res.status(400).json({ message: "no repair ID provided" });
    return;
  }

  try {
    await RepairService.deleteRepair(repairId);
  } catch (error: any) {
    res.send({
      err: "delete error ID: " + repairId,
      message: error.message,
    });
  }
};

//retrieve repairs matching query
const searchRepairs = async (req: Request, res: Response) => {
  try {
    const searchStr = req.body.searchPhrase;
    const limit = Number(req.body.limit) || 10;

    const results = RepairService.searchRepairs(searchStr, limit);

    // const results = await Repair.aggregate([
    //   {
    // $search: {
    //   index: REPAIR_INDEX,
    //   text: {
    //     query: searchStr,
    //     //   path:["title","searchtags","procedureArr","instructions"],
    //     path: { wildcard: "*" },
    //     fuzzy: { maxEdits: 2, prefixLength: 3 },
    //   },
    // },
    //   },
    // ]).limit(limit);
    // res.json({ repairs: results });
  } catch (error) {
    res
      .status(400)
      .json({ message: "failed to get repairs", error: error.message });
  }
};

async function enforceMaxDocuments(
  repairId: string,
  schema,
  maxBackups: number
) {
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
  getRepairsforUser: fetchUserRepairs,
  searchRepairs,
  deleteRepair,
};
