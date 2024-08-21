const Member = require("../../models/Member");

const addMemberTogroup = (req, res) => {
  const invitecode = req.body.invitecode;
  const password = req.body.password;

  res.send({ post: "members" });
};

module.exports = { addMemberTogroup };
