const Member = require("../../models/Member");

const Invite = require("../../models/Invite");

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

  //find invite
  const foundInvite = await Invite.find({ inviteCode: invitecode });

  //verify invite code and optional password

  if (!foundInvite) {
    res.status(401).send();
    return;
  }

  if (foundInvite.password && foundInvite.password == password) {
    res.status(401).send();
    return;
  }

  const promises = createGroupMemberEntries(foundInvite.groups, user);

  await Promise.allSettled(promises);

  //return status 201
  res.status(201).send();
};
module.exports = { getUsersGroups, addMemberTogroup };

//create member of group entries promises
/**
 *
 * @param {groups, user} groups :{id,name}[], user:{_id, username}
 * @returns
 */
function createGroupMemberEntries(groups = [], user) {
  console.log("groups", groups);
  return groups.map((group) => {
    const entry = new Member({
      groupId: group.id,
      groupName: group.name,
      role: ["read"],
      userId: user._id,
      username: user.username,
    });
    return entry.save();
  });
}
