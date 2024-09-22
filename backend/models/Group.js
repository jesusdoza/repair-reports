const mongoose = require("mongoose");

//TODO create admin property on groups schema
//parent schema
//user can be part of one or many groups to view repairs from those groups
const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    immutable: true,
  },
  subGroup: {
    // to organize repairs by subgroups to choose from when submitting repairs
    //will use it as a set
    type: [String],
    default: ["public"],
  },
});

module.exports = mongoose.model("Group", GroupSchema);
