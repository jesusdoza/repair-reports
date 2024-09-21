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

  //loads clerk auth into req.auth
  clerkAuthMiddleware: async function (req, res, next) {
    try {
      const middleware = await clerkClient.expressWithAuth();
      middleware(req, res, next);
    } catch (error) {
      console.log("clerkauthMiddleware failed : ", error);
      next();
    }
  },

  //checks for req.user or req.auth if req.user not found load from the req.auth set by clerk
  loadUserIntoRequest: function (req, res, next) {
    const userInRequest = req.user; //passport was used for auth
    const clerkAuthUserId = req.auth.userId; // clerk was used for auth

    if (clerkAuthUserId && !userInRequest) {
      try {
        User.findOne({ providerId: clerkAuthUserId }, (err, user) => {
          if (err) {
            console.log("error finding one load user req");
            next();
            return;
          }

          if (user) {
            const { password, ...cleanUser } = user._doc;
            req.user = cleanUser;
            next();
            return;
          }

          next();
        });
      } catch (error) {
        console.log("error loading user middleware");
      }
    } else {
      next();
    }
  },

  //verify user was authenticated and loaded into req else return 401
  verifyAuth: function (req, res, next) {
    const passportJsAuth = req.user;
    const clerkAuth = req.auth.userId;

    if (!passportJsAuth && !clerkAuth) {
      res.status(401).send({ message: "not logged in", login: "failed" });
      return;
    }

    if (clerkAuth && !passportJsAuth) {
      res.status(401).send({ message: "not logged in", login: "failed" });
      return;
    }

    next();
  },
};
