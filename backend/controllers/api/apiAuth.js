const passport = require("passport");
const Member = require("../../models/Member");
const Group = require("../../models/Group");
const validator = require("validator");
const User = require("../../models/User");
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

///TODO CHECK SIGNUP
exports.apiSignup = async (req, res, next) => {
  //checking to see if password ect match

  let foundInvite = new Invite();
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
    // groups: foundInvite.groups,//! handling group membership with members database collection
  });

  //verify user email is unique and create user
  User.findOne(
    { $or: [{ email: req.body.email }, { username: req.body.username }] },
    async (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        //TODO REMOVE CONSOLE
        // console.log("user email in use");
        return res.status(400).send({ error: "email invalid" });
      }

      //send creation request to database
      const result = await user.save(async (err, createdUser) => {
        //save the new user model to create a new user in our users collection
        if (err) {
          return next(err);
        }

        try {
          //create member entries for each group in invite

          const promises = createGroupMemberEntries(
            foundInvite.groups,
            createdUser
          );

          await Promise.allSettled(promises);
        } catch (error) {
          console.error("failed to create member of group entries");
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          const { password, ...cleanUser } = createdUser;

          res.send({
            message: "user created",
            signup: "success",
            user: cleanUser,
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

//create member of group entries promises
/**
 *
 * @param {groups, user} groups :{id,name}[], user:{_id, username}
 * @returns
 */
function createGroupMemberEntries(groups = [], user) {
  console.log("groups", groups);
  return groups.map((group) => {
    const entry = new Member({
      groupId: group.id,
      groupName: group.name,
      role: ["read"],
      userId: user._id,
      username: user.username,
    });
    return entry.save();
  });
}
