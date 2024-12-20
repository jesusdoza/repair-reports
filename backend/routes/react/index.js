const router = require("express").Router();

const path = require("path");
const fs = require("fs");

router.get("/", async (req, res) => {
  console.log("getting page for react");
  const directoryPath = "../backend/public"; // Replace this with your directory path

  try {
    // Read the contents of the directory
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }
    });

    await fs.readFile(path.resolve("./public/index.html"));

    res.sendFile(path.resolve("./public/index.html"));
  } catch (error) {
    res.send({ error: "no file found" });
  }
});

module.exports = router;
