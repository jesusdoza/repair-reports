const mongoose = require("mongoose");

const RepairSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("RepairHistory");
