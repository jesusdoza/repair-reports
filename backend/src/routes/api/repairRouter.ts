import apiController from "../../controllers/api/repairsController.js";
import { Router } from "express";

const router = Router();

router.get("/", apiController.getNewestRepairs);
// router.get("/", (req, res) => {
//   res.send("Repair endpoint is working");
// });
router.post("/", apiController.addRepair);
router.put("/", apiController.updateRepair);
router.post("/search", apiController.searchRepairs);
router.get("/user", apiController.getUsersRepairs);
router.get("/:id", apiController.getRepairById);
router.delete("/", apiController.deleteRepair);
export default router;
