import mongoose from "mongoose";
import { RepairSchema } from "./Repair.js";

const RepairHistorySchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  repair: {
    type: String,
    required: true,
  },
  data: {
    type: RepairSchema,
    required: true,
  },
});

export default mongoose.model("RepairHistory", RepairHistorySchema);
