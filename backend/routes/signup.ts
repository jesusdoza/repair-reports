import { Router } from "express";
import authController from "../controllers/auth";

const router = Router();

// @route /signup/*
router.get("/", authController.getSignup);
router.post("/", authController.postSignup);

export default router;
