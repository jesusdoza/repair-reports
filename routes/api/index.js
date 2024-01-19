const router = require("express").Router();
const apiAuthController = require("../../controllers/api/apiAuth");
const { ensureAuth } = require("../../middleware/auth");

router.post("/login", apiAuthController.apiLogin);
router.get("/logout", apiAuthController.apiLogout);
router.post("/signup", apiAuthController.apiSignup);

module.exports = router;
