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
  clerkAuthMiddleware: function (req, res, next) {
    const middleware = clerkClient.expressWithAuth();
    middleware(req, res, next);
  },

  loadUserIntoRequest: function (req, res, next) {
    const passportJsAuth = req.user; //passport was used for auth
    const clerkAuthUserId = req.auth.userId; // clerk was used for auth
    // console.log("passportJsAuth", passportJsAuth);
    //TODO get user from mongodb if clerk was used
    if (clerkAuthUserId && !passportJsAuth) {
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

  verifyAuth: function (req, res, next) {
    const passportJsAuth = req.user;
    const clerkAuth = req.auth.userId;

    // if(clerkAuth &&  !passportJsAuth){
    //   req.user=req.auth
    // }

    if (!passportJsAuth && !clerkAuth) {
      res.status(401).send({ message: "not logged in", login: "failed" });
      return;
    }

    next();
  },
};
