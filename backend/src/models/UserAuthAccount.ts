import { time } from "console";
import mongoose from "mongoose";

const userAuthAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      required: true,
      enum: ["firebase", "clerk", "auth0", "google", "facebook", "github"],
    },
    providerUserId: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Unique provider identity system-wide
userAuthAccountSchema.index({ provider: 1 }, { unique: true });
// Fast lookups for user’s accounts & primary

const UserAuthAccount = mongoose.model(
  "UserAuthAccount",
  userAuthAccountSchema
);
export default UserAuthAccount;
