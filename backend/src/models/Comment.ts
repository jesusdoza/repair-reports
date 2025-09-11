import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    default: "anonymous",
  },
  repairid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  reply: {
    default: null,
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
  },
  createdate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("comment", commentSchema);
