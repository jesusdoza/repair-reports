const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    role: {
      // application wide role default basic
      type: String,
      default: "basic",
    },
    version: {
      type: Number,
      default: 5,
    },
    email: {
      unique: true, //! made unique
      type: String,
      default: "no_email@no_email.com",
      lowercase: true,
    },
    authProvider: {
      type: String,
      lowercase: true,
      required: true,
      default: "local",
    },
    providerId: {
      type: String,
      lowercase: true,
      default: null,
    },
    // groups: {
    //   //groups user belongs to default personal group
    //   type: [String],
    //   default: function () {
    //     return this.username;
    //   },
    // },
  },
  {
    collection: "users",
  }
);

// Password hash middleware.
UserSchema.pre("save", function save(next) {
  // console.log(`pre save`, this)
  const user = this;
  // console.log("user", user);
  // console.log("first", !user.isModified("password"));
  // console.log('user.authProvider !== "local"', user.authProvider !== "local");
  if (!user.isModified("password") || user.authProvider !== "local") {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      console.log(user);
      next();
    });
  });
});

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
