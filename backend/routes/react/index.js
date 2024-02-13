const router = require("express").Router();
const reactController = require("../../controllers/react");

router.use("/*", reactController.serveApp);

module.exports = router;
