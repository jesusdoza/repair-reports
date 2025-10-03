// import packages
import express from "express";
import cors from "cors";
// import mongoose from "mongoose";
// import morgan from "morgan";
// import flash from "express-flash";
// import MongoStore from "connect-mongo";
// import cookieParser from "cookie-parser";

// require("dotenv").config({ path: "./config/.env" }); // to use with enviroment variables initializes enviroment vars
import { corsOptionsHandler } from "./config/corsOptionsHandler.js";

try {
  require("./config/clerkClient.js");
} catch (error) {
  console.error("failed to load clerk client");
}

const app = express();
// const PORT = 8000;
const cookieMaxAge = 15 * 60 * 1000;

app.set("view engine", "ejs");
// app.use(require("./middleware/httpsRedirect").httpsRedirect);
app.use(cors(corsOptionsHandler));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //get body data
// app.use(morgan("dev"));
app.use(express.static("public"));

// Sessions
// app.use(cookieParser());
// app.use(
//   session({
//     secret: process.env.session_secret,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.connect_string,
//     }),
//     rolling: true,
//     cookie: {
//       maxAge: cookieMaxAge,
//     },
//   })
// );

// app.use(flash());
// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// router files
// import formRoutes from "./routes/formRouter.js";
// import repairRoutes from "./routes/repair";
// import loginRoutes from "./routes/login";
// import logoutRoutes from "./routes/logout";
// import signUpRoutes from "./routes/signup";
// import homeRoutes from "./routes/home";
// import profileRoutes from "./routes/profile";
// import dashboardRoutes from "./routes/dashboard.js";
// import commentRoutes from "./routes/comments.js";
import apiRoutes from "./routes/api/index.js";
// import reactRoutes from "./routes/react/index.js";

// =============================================================
// ROUTES
app.use("/api", apiRoutes);
// app.use("/", reactRoutes);
// app.use("*", reactRoutes);
// app.use("/login", loginRoutes);
// app.use("/logout", logoutRoutes);
// app.use("/signup", signUpRoutes);
// app.use("/repairform", formRoutes);
// app.use("/", homeRoutes);
// app.use("/repair", ensureAuth, repairRoutes);
// app.use("/profile", ensureAuth, profileRoutes);
// app.use("/dashboard", ensureAuth, dashboardRoutes);
// app.use("/comments", ensureAuth, commentRoutes);

export default app;
