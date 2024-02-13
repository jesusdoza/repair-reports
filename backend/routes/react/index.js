const router = require("express").Router();
const reactController = require("../../controllers/react");

const path = require("path");

router.get("*", (req, res) => {
  const directoryPath = "../backend/public"; // Replace this with your directory path

  // Read the contents of the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    // Print the names of files and subdirectories
    files.forEach((file) => {
      console.log(file);
    });
  });

  res.sendFile(path.resolve("./public/react"));
});

module.exports = router;
