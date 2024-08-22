const router = require("express").Router();
const apiAuthController = require("../../controllers/api/apiAuth");
const groupsRouter = require("./groupsRouter.js");
const { ensureAuthApi } = require("../../middleware/auth");
const repairRouter = require("./repairs");
const signatureRouter = require("./signature.js");
const imagesRouter = require("./imagesRouter.js");

const inviteController = require("../../controllers/api/inviteController.js");

// /api/*

router.post("/login", apiAuthController.apiLogin);
router.get("/login/verify", ensureAuthApi, apiAuthController.apiVerifyLogin);
router.get("/logout", apiAuthController.apiLogout);
router.post("/signup", apiAuthController.apiSignup);

router.get("/invite", ensureAuthApi, inviteController.getUsersInvites);
router.post("/invite", ensureAuthApi, inviteController.postInvite);

router.use("/repairs", ensureAuthApi, repairRouter);
router.use("/signform", ensureAuthApi, signatureRouter);
router.use("/images", ensureAuthApi, imagesRouter);

// router.use("/groups", ensureAuthApi, groupsRouter);
router.use("/groups", groupsRouter);

module.exports = router;
