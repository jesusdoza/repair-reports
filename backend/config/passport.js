const LocalStrategy = require("passport-local").Strategy;
const OAuth2Strategy = require("passport-oauth2").Strategy;
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../models/User");

//Oauth2 vars
const AUTH_URL = process.env.OAUTH_KEYCLOAK_AUTH_URL;
const TOKEN_URL = process.env.OAUTH_KEYCLOAK_TOKEN_URL;
const CLIENT_ID = process.env.OAUTH_KEYCLOAK_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_KEYCLOAK_SECRET;
const CALLBACK_URL = "http://192.168.1.88:80/api/oauth/callback";

//passport configure local strategy
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      console.log("local strategy");
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

  //sessions Local strategy
  passport.serializeUser((user, done) => {
    console.log("user at serializer", user);
    // console.log("done at serializer", done);
    done(null, user.id);
  });

  // session LocalStrategy
  passport.deserializeUser((id, done) => {
    console.log("deserialize ", id);

    User.findById(id, (err, user) => {
      const { password, ...cleanUser } = user._doc;
      done(err, cleanUser);
    });
  });

  // KEYCLOAK
  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: AUTH_URL,
        tokenURL: TOKEN_URL,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        scope: ["openid", "email"],
      },

      async function (accessToken, refreshToken, profile, cb) {
        console.log("profile at use oauth strategy", profile);

        let userId, email, name;

        try {
          const response = await axios.get(
            "http://localhost:8180/realms/repair-reports/protocol/openid-connect/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const data = response.data;
          console.log("data", data);

          name = data.given_name;
          email = data.email;
          id = data.sub;
        } catch (err) {
          console.log("err getting users info from oauth");
        }

        // console.log("response", response.data);

        User.findOne({ _id: userId }, async function (err, user) {
          let foundUser = user;

          if (!foundUser) {
            const newUser = new User({ username: name, email, password: "" });
            foundUser = await newUser.save();
          }

          console.log("accessToken", accessToken.slice(0, 6));
          console.log("profile", profile);
          console.log("refreshToken", refreshToken.slice(0, 6));

          return cb(err, foundUser);
        });
      }
    )
  );
};
