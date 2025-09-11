import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    role: {
      // application wide role default basic
      type: String,
      default: "basic",
    },
    email: {
      unique: true, //! made unique
      type: String,
      default: "no_email@no_email.com",
      lowercase: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "users",
  }
);

export default mongoose.model("User", UserSchema);
