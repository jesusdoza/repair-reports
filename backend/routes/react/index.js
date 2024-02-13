const router = require("express").Router();
const reactController = require("../../controllers/react");

const path = require("path");

//! NOT USED
router.get("*", (req, res) => {
  // res.send({ serveApp: "serve app" });
  console.log(
    '(path.resolve("./public/react/index.html")',
    path.resolve("./public/react/index.html")
  );
  res.sendFile(path.resolve("./public/react/index.html"));
});

module.exports = router;
