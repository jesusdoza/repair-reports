const Invite = require("../../models/Invite");

const getInvite = async (req, res) => {
  const inviteCode = req.params["inviteCode"];
  const invitePhrase = req.params["invitePhrase"];

  try {
    if (!inviteCode || !invitePhrase)
      throw new Error("no invite code or phrase");

    const invite = await Invite.findOne({ inviteCode, invitePhrase });

    if (!invite) {
      res.status(404).send({ inviteCode, invitePhrase });
      return;
    }

    res.send({ invite });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "failed to get invite",
      invite: { inviteCode, invitePhrase },
    });
  }
};

module.exports = { getInvite };
