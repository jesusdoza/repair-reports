const router = require("express").Router();
const apiController = require("../../controllers/api");

router.get("/", apiController.getNewestRepairs);
router.post("/", apiController.searchRepairs);
router.put("/", apiController.updateRepair);

module.exports = router;
