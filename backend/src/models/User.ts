import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    role: {
      // application wide role default basic
      type: String,
      default: "user",
    },
    email: {
      unique: true,
      type: String,
      lowercase: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "users",
    timesestamps: { createdAt: true, updatedAt: true },
  }
);

export default mongoose.model("User", UserSchema);
