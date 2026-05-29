"use strict";

import "./config/loadEnv.js";

import app from "./app.js";

// import dotenv from "dotenv";
// dotenv.config({ path: "./src/config/.env" });

import connectDB from "./config/dbM.js";

const PORT = process.env.PORT || 8000;

async function server() {
  console.log("starting server");
  await connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`server runing on port ${PORT}`);
    });
  });
}
server();
