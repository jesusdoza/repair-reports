const router = require("express").Router();
const membersController = require("../../controllers/api/membersController.js");

router.post("/join", membersController.addMemberTogroup);
router.get("/user", membersController.getUsersGroups);

module.exports = router;
