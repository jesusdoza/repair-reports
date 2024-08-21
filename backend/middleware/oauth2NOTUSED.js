const passport = require("passport");

const redirect = "http://192.168.1.88:5173/";

function oauth2Authenticate(req, res, next) {
  passport.authenticate("oauth2", { failureRedirect: "/react" })(req, res);
}

module.exports = { oauth2Authenticate };
