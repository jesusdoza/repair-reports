// import packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
const flash = require("express-flash");
const passport = require("passport");
const session = require("express-session"); //enables them to stay logged in
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config/.env" }); // to use with enviroment variables initializes enviroment vars
const { corsOptionsHandler } = require("./config/corsOptionsHandler.js");

try {
  require("./config/clerkClient.js");
} catch (error) {
  console.error("failed to load clerk client");
}
require("./config/passport")(passport);
const app = express();
// const PORT = 8000;
const cookieMaxAge = 15 * 60 * 1000;

app.set("view engine", "ejs");
app.use(require("./middleware/httpsRedirect").httpsRedirect);
app.use(cors(corsOptionsHandler));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //get body data
app.use(logger("dev"));
app.use(express.static("public"));

// Sessions
app.use(cookieParser());
app.use(
  session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.connect_string,
    }),
    rolling: true,
    cookie: {
      maxAge: cookieMaxAge,
    },
  })
);

app.use(flash());
// Passport middleware
const { ensureAuth } = require("./middleware/auth");
app.use(passport.initialize());
app.use(passport.session());

// router files
const formRoutes = require("./routes/formRouter.js");
const repairRoutes = require("./routes/repair");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const signUpRoutes = require("./routes/signup");
const homeRoutes = require("./routes/home");
const profileRoutes = require("./routes/profile");
const dashboardRoutes = require("./routes/dashboard.js");
const commentRoutes = require("./routes/comments.js");
const apiRoutes = require("./routes/api");
const reactRoutes = require("./routes/react");

// =============================================================
// ROUTES
app.use("/api", apiRoutes);
app.use("/", reactRoutes);
app.use("*", reactRoutes);
// app.use("/login", loginRoutes);
// app.use("/logout", logoutRoutes);
// app.use("/signup", signUpRoutes);
// app.use("/repairform", formRoutes);
// app.use("/", homeRoutes);
// app.use("/repair", ensureAuth, repairRoutes);
// app.use("/profile", ensureAuth, profileRoutes);
// app.use("/dashboard", ensureAuth, dashboardRoutes);
// app.use("/comments", ensureAuth, commentRoutes);

module.exports = app;
