const { clerkClient } = require("@clerk/clerk-sdk-node");
const User = require("../models/User");
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

  //loads clerk auth into req.auth
  clerkAuthMiddleware: function (req, res, next) {
    const middleware = clerkClient.expressWithAuth();
    middleware(req, res, next);
  },

  //checks for req.user or req.auth if req.user not found load from the req.auth set by clerk
  loadUserIntoRequest: function (req, res, next) {
    const userInRequest = req.user; //passport was used for auth
    const clerkAuthUserId = req.auth.userId; // clerk was used for auth

    if (clerkAuthUserId && !userInRequest) {
      User.findOne({ providerId: clerkAuthUserId }, (err, user) => {
        if (err) {
          next();
        }

        if (user) {
          const { password, ...cleanUser } = user._doc;
          req.user = cleanUser;
          next();
        }
      });
    }
  },

  //verify user was authenticated and loaded into req else return 401
  verifyAuth: function (req, res, next) {
    const passportJsAuth = req.user;
    const clerkAuth = req.auth.userId;

    console.log("req.user verify auth", req.user);

    if (!passportJsAuth && !clerkAuth) {
      res.status(401).send({ message: "not logged in", login: "failed" });
      return;
    }

    next();
  },
};
