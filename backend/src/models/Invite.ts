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

const Invite = mongoose.models?.Invite
  ? mongoose.models.Invite
  : mongoose.model("Invite", InviteSchema);

export default Invite;
