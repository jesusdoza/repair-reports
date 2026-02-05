import Mongoose from "mongoose";
import { Repair } from "../models/Repair.js";
import Member from "../models/Member.js";

const REPAIRS_INDEX = process.env.search_index || "repairs_index";

type ImageObjectT = {
  url: string;
  caption?: string;
  folder?: string;
  imageId?: string;
  thumbnail?: string;
};

type ProcedureT = {
  images?: ImageObjectT[];
  instructions?: string;
};

type RepairT = {
  title: string;
  type?: string;
  status: "pending" | "in_progress" | "completed";
  category?: string;
  manufacturer?: string;
  createdBy: Mongoose.Types.ObjectId;
  removed: boolean;
  visibility?: "public" | "private" | "organization";
  procedures?: ProcedureT[];
  organization: Mongoose.Types.ObjectId;
};

class RepairService {
  // Service methods here
  static async createRepair(data: RepairT) {
    return await Repair.create(data);
  }

  static async getRepairById(id: string, organization: string) {
    if (!id) throw new Error("no repair ID provided");
    if (!organization) throw new Error("no organization ID provided");

    return await Repair.findOne({
      _id: id,
      organization: new Mongoose.Types.ObjectId(organization),
    }).lean();
  }

  static async updateRepair(id: string, data: Partial<RepairT>) {
    return await Repair.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteRepair(id: string) {
    return await Repair.findByIdAndDelete(id);
  }

  static async getUserRepairs({
    userId,
    limit = 10,
    skips = 0,
    searchIndex,
  }: {
    userId: string;
    limit?: number;
    skips?: number; // howmany entries to skip for pagination
    searchIndex?: string | undefined;
  }) {
    const membership = await Member.find({
      user: new Mongoose.Types.ObjectId(userId),
    }).lean();

    const skipEntries = skips ? skips * limit : 0;

    const userOrgIds = membership.map((m) => m.organization);

    const aggregateResults = await Repair.aggregate([
      {
        //get only users repairs
        $match: {
          $or: [
            { createdBy: new Mongoose.Types.ObjectId(userId) },
            { organization: { $in: userOrgIds } },
          ],
          removed: false,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $skip: skipEntries,
      },
      {
        //create metadata to include total from previous stage
        // $addFields: {
        //   metaData: [{ $count: "total" }],
        //   results: [{ $skip: skips }, { $limit: limit }],
        // },
        $facet: {
          metaData: [{ $count: "total" }],
          results: [{ $skip: skipEntries }, { $limit: limit }],
        },
      },
    ]);

    return aggregateResults[0] as {
      results: RepairT[];
      metaData: { total: number };
    };
  }

  static async getLatestRepairs(limit = 10, page = 1, organizationId?: string) {
    //no organization, no results
    let orgId: Mongoose.Types.ObjectId | undefined = undefined;

    if (!organizationId) {
      return [];
    }

    orgId = new Mongoose.Types.ObjectId(organizationId);
    const skips = limit * (page - 1);
    const aggregateResults = await Repair.aggregate([
      {
        //get only repairs
        $match: {
          removed: false,
          organization: orgId,
          visibility: "public",
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
          metaData: [{ $count: "totalRepairs" }],
          results: [{ $skip: skips }, { $limit: limit }],
        },
      },
    ]);
    return aggregateResults[0];
  }

  static async searchRepairs({
    searchStr,
    limit = 10,
    searchIndex,
  }: {
    searchStr: string;
    limit?: number;
    searchIndex?: string | undefined;
  }) {
    const results = await Repair.aggregate([
      {
        $search: {
          index: REPAIRS_INDEX,
          text: {
            query: searchStr,
            // searchAfter: searchIndex || undefined,
            //   path:["title","searchtags","procedureArr","instructions"],
            path: { wildcard: "*" },
            fuzzy: { maxEdits: 2, prefixLength: 3 },
          },
        },
      },
      {
        $addFields: {
          paginationToken: { $meta: "searchSequenceToken" },
        },
      },
      {
        $facet: {
          metaData: [{ $count: "total" }],
          results: [{ $limit: 5 }],
        },
      },
    ]);
    return results[0] as { metaData: { total: number }; results: RepairT[] };
  }
}

export type { RepairT };
export default RepairService;
