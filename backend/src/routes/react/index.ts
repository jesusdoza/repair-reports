import { Router } from "express";

import { resolve } from "path";
import { readdir, readFile } from "fs";

const router = Router();

router.get("/", async (req, res) => {
  console.log("getting page for react");
  const directoryPath = "../backend/public"; // Replace this with your directory path

  try {
    // Read the contents of the directory
    readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }
    });

    await readFile(resolve("./public/index.html"), (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
    });

    res.sendFile(resolve("./public/index.html"));
  } catch (error) {
    res.send({ error: "no file found" });
  }
});

export default router;
