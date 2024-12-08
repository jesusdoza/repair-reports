const mongoose = require("mongoose");
const { RepairSchema } = require("./Repair");

const RepairHistorySchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  data: {
    type: RepairSchema,
    required: true,
  },
});

module.exports = mongoose.model("RepairHistorySchema");
