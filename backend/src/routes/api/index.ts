const router = require("express").Router();
import membersRouter from "./membersRouter.js";
import imagesRouter from "./imagesRouter.js";
import {
  clerkAuthMiddleware,
  loadUserIntoRequest,
  verifyAuth,
} from "../../middleware/auth";
import repairRouter from "./repairs";
import signatureRouter from "./signatureRouter.js";

import inviteController from "../../controllers/api/inviteController.js";

// /api/*

const middlewareChain = [clerkAuthMiddleware, loadUserIntoRequest, verifyAuth];

//open endpoints
// router.post("/login", apiAuthController.apiLogin);
// router.get("/logout", apiAuthController.apiLogout);
// router.post("/signup", apiAuthController.apiSignup);
// router.post("/signup/provider", apiAuthController.apiSignupWithProvider);
router.get("/invite/verify/:invitecode", inviteController.getInvite);

//protected endpoints
// router.get(
//   "/login/verify",
//   ...middlewareChain,
//   apiAuthController.apiVerifyLogin
// );
router.get("/invite", ...middlewareChain, inviteController.getUsersInvites);
router.post("/invite", ...middlewareChain, inviteController.postInvite);
router.use("/repairs", ...middlewareChain, repairRouter);
router.use("/signform", ...middlewareChain, signatureRouter);
router.use("/images", ...middlewareChain, imagesRouter);
router.use("/members", ...middlewareChain, membersRouter);

module.exports = router;
