const router = require("express").Router();
const apiAuthController = require("../../controllers/api/apiAuth");
const membersRouter = require("./membersRouter.js");
const {
  clerkAuthMiddleware,
  loadUserIntoRequest,
  verifyAuth,
} = require("../../middleware/auth");
const repairRouter = require("./repairs");
const signatureRouter = require("./signature.js");
const imagesRouter = require("./imagesRouter.js");

const inviteController = require("../../controllers/api/inviteController.js");

// /api/*

const middlewareChain = [clerkAuthMiddleware, loadUserIntoRequest, verifyAuth];

//open endpoints
router.post("/login", apiAuthController.apiLogin);
router.get("/logout", apiAuthController.apiLogout);
router.post("/signup", apiAuthController.apiSignup);
router.post("/signup/provider", apiAuthController.apiSignupWithProvider);
router.get("/invite/verify/:invitecode", inviteController.getInvite);

//protected endpoints
router.get(
  "/login/verify",
  ...middlewareChain,
  apiAuthController.apiVerifyLogin
);
router.get("/invite", ...middlewareChain, inviteController.getUsersInvites);
router.post("/invite", ...middlewareChain, inviteController.postInvite);
router.use("/repairs", ...middlewareChain, repairRouter);
router.use("/signform", ...middlewareChain, signatureRouter);
router.use("/images", ...middlewareChain, imagesRouter);
router.use("/members", ...middlewareChain, membersRouter);

module.exports = router;
