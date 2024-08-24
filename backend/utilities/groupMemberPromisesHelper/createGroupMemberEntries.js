//UTILITY ********************************8
//create member of group entries promises

const Member = require("../../models/Member");

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

module.exports = createGroupMemberEntries;
