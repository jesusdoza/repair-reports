import type { Request, Response } from "express";
import { Router } from "express";
import signupRouter from "./signupRouter.js";

import { clerkLoadUserMiddleware, verifyAuth } from "../../middleware/auth.js";
import repairRouter from "./repairRouter.js";
// import membersRouter from "./membersRouter.js";
// import imagesRouter from "./imagesRouter.js";
// import signatureRouter from "./signatureRouter.js";

// import inviteController from "../../controllers/api/inviteController.js";

// /api/*
const router = Router();
const middlewareChain = [clerkLoadUserMiddleware, verifyAuth];
// const middlewareChain: any = [];

//open endpoints
// router.post("/login", apiAuthController.apiLogin);
// router.get("/logout", apiAuthController.apiLogout);
// router.post("/signup", apiAuthController.apiSignup);
// router.post("/signup/provider", apiAuthController.apiSignupWithProvider);
// router.get("/invite/verify/:invitecode", inviteController.getInvite);

//protected endpoints
// router.get(
//   "/login/verify",
//   ...middlewareChain,
//   apiAuthController.apiVerifyLogin
// );

router.use("/repair", ...middlewareChain, repairRouter);
router.use("/signup", signupRouter);
// router.get("/invite", ...middlewareChain, inviteController.getUsersInvites);
// router.post("/invite", ...middlewareChain, inviteController.postInvite);
// router.use("/signform", ...middlewareChain, signatureRouter);
// router.use("/images", ...middlewareChain, imagesRouter);
// router.use("/members", ...middlewareChain, membersRouter);

export default router;
