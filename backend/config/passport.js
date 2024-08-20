const LocalStrategy = require("passport-local").Strategy;
const OAuth2Strategy = require("passport-oauth2").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

//Oauth2 vars
const AUTH_URL = "https://www.example.com/oauth2/authorize";
const TOKEN_URL = "https://www.example.com/oauth2/token";
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const CALLBACK_URL = "http://localhost:3000/auth/example/callback";

//passport configure local strategy
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            msg: `Email ${email} not found.`,
          });
        }
        if (!user.password) {
          return done(null, false, {
            msg: "no password",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }

          return done(null, false, {
            msg: "Invalid email or password.",
          });
        });
      });
    })
  );

  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: AUTH_URL,
        tokenURL: TOKEN_URL,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ exampleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );

  //sessions Local strategy
  passport.serializeUser((user, done) => {
    // console.log("user at serializer", user);
    // console.log("done at serializer", done);
    done(null, user.id);
  });

  // session LocalStrategy
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      //what is used in the req.user object
      const { password, ...cleanUser } = user._doc;
      done(err, cleanUser);
    });
  });
};
