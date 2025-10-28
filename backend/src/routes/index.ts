import Router from "express";
import apiRouter from "./api/index.js";
const router = Router();

router.use("/test", (req, res) => {
  res.send("Test endpoint is working");
});
router.use("/api", apiRouter);

export default router;
