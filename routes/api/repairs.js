const router = require("express").Router();
const apiController = require("../../controllers/api/api");

router.get("/", apiController.getNewestRepairs);

module.exports = router;
