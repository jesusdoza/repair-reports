import mongoose from "mongoose";

//TODO create admin property on groups schema
//parent schema
//user can be part of one or many groups to view repairs from those groups
const Organization = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    //user who created the group
    type: String,
    immutable: true,
  },
});

export default mongoose.model("Organization", Organization);
