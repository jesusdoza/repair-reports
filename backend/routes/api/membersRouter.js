const router = require("express").Router();
const imagesController = require("../../controllers/api/imagesController.js");

router.post("/", (req, res) => {
  res.send({ post: "members" });
});

module.exports = router;
