const passport = require("passport-oauth2");

function oauth2Authenticate(req, res, next) {
  passport.authenticate("oauth2", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.

      next();
      //   res.redirect('/');
    };
}

module.exports = { oauth2Authenticate };
