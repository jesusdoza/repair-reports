import mongoose from "mongoose";

//Member collection will track group to user relationships,
//user can have multiple member entries detailing their role in a group

//user groups schema
//user is a member of a group
const MemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // <-- Reference to User
    ref: "User",
  },
  username: {
    type: String,
    required: true,
  },
  roles: {
    // 1 - read , 2 - read write , 3 - read, write, soft delete
    type: [String],
    default: ["read"],
  },
  organization: {
    //organization id
    type: mongoose.Schema.Types.ObjectId, // <-- Reference to Organization
    ref: "Organization",
  },
});

// Prevent model overwrite upon initial compiler for fast refresh

export default mongoose.model("Member", MemberSchema);
