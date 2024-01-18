const router = require("express").Router();
const authController = require("../controllers/auth");

router.post("/login", authController.postLogin);
router.post("/logout", authController.logout);

module.exports = router;
