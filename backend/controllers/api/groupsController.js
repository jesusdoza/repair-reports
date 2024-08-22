const Member = require("../../models/Member");

const Invite = require("../../models/Invite");

const getUsersGroups = async (req, res) => {
  const userId = req.user._id;
  const usersGroups = await Member.find({ userId });

  res.send(usersGroups);
};

const addMemberTogroup = async (req, res) => {
  const invitecode = req.body.inviteCode;
  const password = req.body?.password;

  //find invite
  const foundInvite = await Invite.find({ inviteCode: invitecode });

  //verify invite code and optional password

  if (!foundInvite) {
    res.status(401).send();
  }

  //return status 201

  //return 401 on error or bad invite

  res.send({ post: "members" });
};
module.exports = { getUsersGroups, addMemberTogroup };
