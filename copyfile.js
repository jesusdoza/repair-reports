const fs = require("fs");
const path = require("path");

const envFile = path.normalize("/etc/secrets/.env.production");
const newEnvFile = path.normalize("./client/.env.production");

if (fs.existsSync(envFile)) {
  console.log("env file exists");
  fs.copyFile(envFile, newEnvFile, () => {
    console.log("secret file copied");
  });

  return;
}
console.log("no file exists");
