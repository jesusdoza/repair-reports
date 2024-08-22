const router = require("express").Router();
const groupsController = require("../../controllers/api/groupsController.js");

router.post("/", groupsController.addMemberTogroup);
router.get("/", groupsController.getUsersGroups);

module.exports = router;
