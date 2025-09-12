import mongoose from "mongoose";

//will track third party auth providers like clerk to user mapping
const AuthProviderSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["clerk"],
    },
    providerId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"], // <-- Email validation
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AuthProvider", AuthProviderSchema);
