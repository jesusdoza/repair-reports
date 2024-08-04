const Member = require("../../models/Member");

const getUsersGroups = async (req, res) => {
  const userId = req.user._id;
  const usersGroups = await Member.find({ userId });

  res.send(usersGroups);
};

module.exports = { getUsersGroups };
