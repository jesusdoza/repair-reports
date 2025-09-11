import mongoose from "mongoose";
import { Repair } from "./Repair.js";

const RepairHistorySchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  repair: {
    type: mongoose.Schema.Types.ObjectId, // <-- Use ObjectId for references
    ref: "Repair",
    required: true,
  },
  data: {
    type: Repair.schema,
    required: true,
  },
});

export default mongoose.model("RepairHistory", RepairHistorySchema);
