//UTILITY ********************************8
//create member of group entries promises

const Member = require("../../models/Member");

/**
 *
 * @param {groups, user} groups :{id,name,roles:String[]}[], user:{_id, username}
 * @returns
 */
function createGroupMemberEntries(groups = [], user) {
  return groups.map(async (group) => {
    //check if already have group entry
    let foundMemberShip;
    const newRoles = group.roles;

    try {
      foundMemberShip = await Member.findOne({
        userId: user._id,
        groupId: group.id,
      });
    } catch (error) {
      console.log("error finding memberships ");
    }

    //existing membership update

    try {
      if (foundMemberShip) {
        const updatedRoles = Array.from(
          new Set([...foundMemberShip.roles, ...newRoles]).values()
        );

        foundMemberShip.roles = updatedRoles;

        return foundMemberShip.save();
      } else {
        const entry = new Member({
          groupId: group.id,
          groupName: group.name,
          role: newRoles,
          userId: user._id,
          username: user.username,
        });

        console.log("entry", entry);
        return entry.save();
      }
    } catch (error) {
      console.log("error saving membership", error);
    }
  });
}

module.exports = createGroupMemberEntries;
