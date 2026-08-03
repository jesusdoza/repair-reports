import mongoose from "mongoose";
// import bcrypt from "bcrypt";

type UserT = {
  username: string;
  role: "user";
  email: string;
  isActive: boolean;
};

const UserSchema = new mongoose.Schema<UserT>(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    role: {
      // application wide role default basic
      type: String,
      enum: ["user"],
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
    timestamps: true,
  },
);

export default mongoose.model<UserT>("User", UserSchema);
