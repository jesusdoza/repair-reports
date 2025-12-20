import Router from "express";
import { SignupController } from "../../controllers/SignupController.js";
const router = Router();

router.post("/provider", SignupController.signupWithProvider);

export default router;
