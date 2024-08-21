const router = require("express").Router();
const apiAuthController = require("../../controllers/api/apiAuth");
const groupsController = require("../../controllers/api/groupsController.js");
const { ensureAuthApi } = require("../../middleware/auth");
// const { oauth2Authenticate } = require("../../middleware/oauth2NOTUSED.js");
const repairRouter = require("./repairs");
const signatureRouter = require("./signature.js");
const imagesRouter = require("./imagesRouter.js");

const inviteController = require("../../controllers/api/inviteController.js");
const passport = require("passport");

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

router.use("/groups", ensureAuthApi, groupsController.getUsersGroups);

router.get(
  "/oauth/callback",
  passport.authenticate("oauth2", {
    failureRedirect: "http://192.168.1.88:5173/login",
  }),
  (req, res) => {
    res.redirect("http://192.168.1.88:5173/oauthsuccess");
  }
);

// router.use(
//   "/oauth/good",
//   passport.authenticate("oauth2", {
//     failureRedirect: "http://192.168.1.88:5173/login",
//   }),
//   (req, res) => {
//     res.send("it workds");
//   }
// );

router.get("/oauth", passport.authenticate("oauth2"));

module.exports = router;
