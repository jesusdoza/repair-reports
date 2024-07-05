const Invite = require("../../models/Invite");

const getInvite = async (req, res) => {
  const invite = Invite.findOne({});

  if (!invite) {
    res.status(404).send();
  }
  res.send({ invite });
};

module.exports = { getInvite };
