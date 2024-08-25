const Member = require("../../models/Member");

const Invite = require("../../models/Invite");
const createGroupMemberEntries = require("../../utilities/groupMemberPromisesHelper/createGroupMemberEntries");

const getUsersGroups = async (req, res) => {
  const userId = req?.user?._id;

  if (!userId) {
    res.status(401).send();
    return;
  }

  const usersGroups = await Member.find({ userId });

  res.send(usersGroups);
};

const addMemberTogroup = async (req, res) => {
  const invitecode = req.body.inviteCode;
  const password = req.body?.password;
  const user = req.user;

  if (!invitecode) {
    res.status(401).send();
    return;
  }

  //find invite
  const foundInvite = await Invite.findOne({ inviteCode: invitecode });

  //verify invite code and optional password
  if (!foundInvite) {
  }

  if (foundInvite.password && foundInvite.password !== password) {
    res.status(401).send();
    return;
  }

  const promises = createGroupMemberEntries(foundInvite.groups, user);

  const results = await Promise.allSettled(promises);

  //return status 201
  res.status(201).send();
};
module.exports = { getUsersGroups, addMemberTogroup };
