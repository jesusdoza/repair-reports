import Mongoose from "mongoose";
import { Repair } from "../models/Repair.js";

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

  static async getRepairById(id: string, organizationId: string) {
    if (!id) throw new Error("no repair ID provided");
    if (!organizationId) throw new Error("no organization ID provided");

    return await Repair.findOne({ _id: id, organizationId }).lean();
  }

  static async updateRepair(id: string, data: Partial<RepairT>) {
    return await Repair.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteRepair(id: string) {
    return await Repair.findByIdAndDelete(id);
  }

  static async getUserRepairs(
    userId: string,
    limit = 10,
    page = 1,
    searchIndex?: string | undefined
  ) {
    const skips = limit * (page - 1);
    const aggregateResults = await Repair.aggregate([
      {
        //get only users repairs
        $search: {
          removed: false,
          createdBy: new Mongoose.Types.ObjectId(userId),
          searchAfter: searchIndex,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        //create metadata to include total from previous stage
        $addFields: {
          metaData: [{ $count: "total" }],
          results: [{ $skip: skips }, { $limit: limit }],
        },
      },
    ]);
  }

  static async getLatestRepairs(limit = 10, page = 1, organizationId?: string) {
    // return await Repair.find().sort({ createdAt: -1 }).limit(10);/

    if (!organizationId) {
      return [];
    }

    const orgId = new Mongoose.Types.ObjectId(organizationId);
    const skips = limit * (page - 1);
    const aggregateResults = await Repair.aggregate([
      {
        //get only users repairs
        $match: {
          removed: false,
          organizationId: orgId,
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
    return aggregateResults;
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
            searchAfter: searchIndex,
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
    return results;
  }
}

export type { RepairT };
export default RepairService;
