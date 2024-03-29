const router = require("express").Router();
const apiController = require("../../controllers/api");

router.get("/", apiController.getNewestRepairs);
router.post("/", apiController.addRepair);
router.put("/", apiController.updateRepair);

module.exports = router;
