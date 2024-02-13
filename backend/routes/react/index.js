const router = require("express").Router();
const reactController = require("../../controllers/react");

router.get("/", reactController.serveApp);

module.exports = router;
