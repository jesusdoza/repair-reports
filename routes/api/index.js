const router = require("express").Router();
const apiAuthController = require("../../controllers/api/apiAuth");
const { ensureAuthApi } = require("../../middleware/auth");

router.post("/login", apiAuthController.apiLogin);
router.get("/logout", apiAuthController.apiLogout);
router.post("/signup", apiAuthController.apiSignup);

router.use("/repairs", ensureAuthApi, (req, res) => {
  res.send({ message: "/api/repairs" });
});

module.exports = router;
