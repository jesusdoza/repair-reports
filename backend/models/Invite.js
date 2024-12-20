const mongoose = require("mongoose");

const GroupData = new mongoose.Schema({
  id: String,
  name: String,
  roles: { type: [String], default: ["read"] },
});

const InviteSchema = new mongoose.Schema({
  inviteCode: {
    type: String,
    required: true,
  },
  //security for specific invite optional
  password: {
    type: String,
    default: null,
  },
  groups: {
    type: [GroupData],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Invite = mongoose.models?.Invite
  ? mongoose.models.Invite
  : mongoose.model("Invite", InviteSchema);

module.exports = Invite;
