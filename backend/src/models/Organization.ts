import { time } from "console";
import mongoose from "mongoose";

//TODO create admin property on groups schema
//parent schema
//user can be part of one or many groups to view repairs from those groups
const Organization = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // <-- Reference to User
      ref: "User",
      immutable: true,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export default mongoose.model("Organization", Organization);
