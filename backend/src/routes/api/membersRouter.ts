import { Router } from "express";
import membersController from "../../controllers/api/membersController.js";

const router = Router();
router.post("/join", membersController.addMemberTogroup);
router.get("/user", membersController.getUsersGroups);

export default router;
