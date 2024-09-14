const router = require("express").Router();
const apiAuthController = require("../../controllers/api/apiAuth");
const membersRouter = require("./membersRouter.js");
const {
  ensureAuthApi,
  clerkAuthMiddleware,
  verifyAuth,
  loadUserIntoRequest,
} = require("../../middleware/auth");
const repairRouter = require("./repairs");
const signatureRouter = require("./signature.js");
const imagesRouter = require("./imagesRouter.js");

const inviteController = require("../../controllers/api/inviteController.js");

// /api/*

const middlewareChain = [
  ensureAuthApi,
  clerkAuthMiddleware,
  verifyAuth,
  loadUserIntoRequest,
];

router.post("/login", apiAuthController.apiLogin);
router.get("/login/verify", ensureAuthApi, apiAuthController.apiVerifyLogin);
router.get("/logout", apiAuthController.apiLogout);
router.post("/signup", apiAuthController.apiSignup);
router.post("/signup/provider", apiAuthController.apiSignupWithProvider);

router.get("/invite", ensureAuthApi, inviteController.getUsersInvites);
router.get("/invite/verify/:invitecode", inviteController.getInvite);
router.post("/invite", ensureAuthApi, inviteController.postInvite);

// router.use("/repairs", ensureAuthApi, repairRouter);
router.use("/repairs", ...middlewareChain, repairRouter);
router.use("/signform", ensureAuthApi, signatureRouter);
router.use("/images", ensureAuthApi, imagesRouter);

// router.use("/groups", ensureAuthApi, groupsRouter);
router.use("/members", membersRouter);

module.exports = router;
