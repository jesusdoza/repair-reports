const passport = require("passport");
// const Group = require("../../models/Group"); //user created groups
const Group = require("../../models/Group"); //user created groups
const validator = require("validator");
const User = require("../../models/User"); //new user gets put in user collection
const Invite = require("../../models/Invite");

exports.apiLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    console.log("User has logged out.");
    req.session.destroy((err) => {
      if (err)
        console.log(
          "Error : Failed to destroy the session during logout.",
          err
        );
      req.user = null;
      res.send({ message: "logout", logout: "success" });
    });
  });
};

exports.apiLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) {
    console.log("invalid email");
    validationErrors.push("Please enter a valid email address.");
  }
  if (validator.isEmpty(req.body.password)) {
    console.log("empty password");

    validationErrors.push("Password cannot be blank.");
  }

  if (validationErrors.length) {
    console.log("setting errors in flash");
    req.flash("errors", validationErrors);
    // console.log("req flash is", locals.messages);
    // return res.redirect("/login");
    res.send({
      message: "login failed",
      login: "failed",
      reason: validationErrors,
    });
    return;
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("authen failed");
      res.send({ message: "login failed", login: "failed" });
      return;
    }
    if (info) {
      console.log("**********info", info);
      req.flash("errors", ["Not authorized check credentials"]);
      res.send({ message: "login failed", login: "failed" });
      return;
    }
    if (!user) {
      req.flash("errors", ["Not authorized check credentials"]);
      console.error("no user found");
      res.send({ message: "login failed", login: "failed" });
      return;
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash("errors", ["Not authorized check credentials"]);
        res.send({ message: "login failed", login: "failed" });
        return;
      }

      //clean
      const { password, ...cleanUser } = user._doc;

      res.send({
        user: cleanUser,
        loginExpires: req.session.cookie._expires,
        login: "success",
      });
    });
  })(req, res, next);
};

exports.apiSignup = async (req, res, next) => {
  //checking to see if password ect match
  console.log(`api signup body`, req.body);

  let foundInvite;
  const { inviteCode, invitePassword } = req.body;

  try {
    foundInvite = await Invite.findOne({ inviteCode });

    if (!foundInvite) {
      res.status(404).send({ invalidInvite: inviteCode });
      return;
    }
  } catch (error) {
    res.status(500).send({ error: "invite lookup failed" });
    return;
  }

  const validationErrors = validateInput(req);

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.send({
      message: "failed to create user",
      signup: "failed",
      reason: validationErrors,
    });
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  //create new user doc locally
  const user = new User({
    //new User is our user model, we grab username,email, password from request body of the form to create a new user
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  //verify user email is unique and create user
  User.findOne(
    { $or: [{ email: req.body.email }, { username: req.body.username }] },
    async (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", ["email already in use"]);
        return res.status(400).send({ error: "email invalid" });
      }

      //send creation request to database
      const result = await user.save(async (err, createdUser) => {
        //save the new user model to create a new user in our users collection
        if (err) {
          return next(err);
        }

        //group created for user
        // const foundGroup = await Group.findOne({
        //   // name: createdUser.username,
        //   createdBy: createdUser._id,
        // });

        // console.log(`found group`, foundGroup);
        // if (!foundGroup) {
        //   console.log(`user created: `, createdUser);
        //   ///no group found make one
        //   const newGroup = await Group.create({
        //     name: user.username,
        //     members: [
        //       {
        //         userid: createdUser._id,
        //         username: createdUser.username,
        //         role: "3",
        //       },
        //     ],
        //     createdBy: createdUser._id,
        //   });
        //   console.log("group made: ", newGroup);
        // }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          res.send({
            message: "user created",
            signup: "success",
            user: createdUser,
          });
        });
      });
    }
  );
};

exports.apiVerifyLogin = async (req, res, next) => {
  const user = req.user;

  console.log("user", user);

  res.status(200).send({ user });
};

///***************** UTILITY************************* */
function validateInput(req) {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push("Please enter a valid email address.");
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push("password must be atleast 8 characters");
  // if (req.body.password !== req.body.confirmPassword)
  //   validationErrors.push("Passwords do not match");

  return validationErrors;
}
