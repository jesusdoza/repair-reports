import { Router } from "express";
import membersController from "../../controllers/api/membersController.js";

const router = Router();
router.post("/join", membersController.addMemberToOrganization);
router.get("/user", membersController.getUsersOrganization);

export default router;
