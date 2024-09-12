const { clerkClient } = require("@clerk/clerk-sdk-node");
//middle ware verify user is authenticated
module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // console.log("sessions is :", req.session);
      return next();
    } else {
      req.session.returnTo = req.originalUrl;
      // console.log("session output", req.session.returnTo);
      req.flash("errors", ["please log in to perform action"]);
      res.redirect("/login");
    }
  },
  //!remove ensureAuthApi when clerk working with failsafe ending middleware
  ensureAuthApi: function (req, res, next) {
    next();
  },
  clerkAuthMiddleware: function (req, res, next) {
    const middleware = clerkClient.expressWithAuth();
    middleware(req, res, next);
  },

  failAuthentication: function (req, res, next) {
    const passportJsAuth = req.user;
    const clerkAuth = req.auth.userId;
    console.log("clerkAuth", !!clerkAuth);
    console.log("passportJsAuth", !!passportJsAuth);
    if (!passportJsAuth && !clerkAuth) {
      res.status(401).send({ message: "not logged in", login: "failed" });
      return;
    }

    next();
  },
};
