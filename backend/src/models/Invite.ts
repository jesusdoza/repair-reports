import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema(
  {
    inviteCode: {
      type: String,
      required: true,
      unique: true,
    },
    //security for specific invite optional
    password: {
      type: String,
      default: null,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId, // <-- Reference to Organization
      ref: "Organization",
      required: false,
    },
    organizationName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "expired"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invite", InviteSchema);
