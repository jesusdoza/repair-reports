const router = require("express").Router();
const reactController = require("../../controllers/react");

const path = require("path");

router.get("*", (req, res) => {
  res.sendFile(path.resolve("./public/react"));
});

module.exports = router;
