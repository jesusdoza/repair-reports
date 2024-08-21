const router = require("express").Router();
const memebersController = require("../../controllers/api/membersController.js");

router.post("/", memebersController.addMemberTogroup);

module.exports = router;
