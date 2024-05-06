const fs = require("fs");
const path = require("path");

const envFile = path.normalize("/etc/secrets/.env.production");
const newEnvFile = path.normalize("./client/.env.production");
const HOSTED_AT = process.env.HOSTED_AT;

function setUpClientEnvironment() {
  copyEnvFile();
}

function copyEnvFile() {
  if (fs.existsSync(envFile)) {
    console.log("env file exists");
    fs.copyFile(envFile, newEnvFile, () => {
      console.log("secret file copied");
    });

    return;
  }
  console.log("no file exists");
  return;
}

//NOT USED WAS ONLY USED WITH OLD CYLIC SERVICE
function writeEnvFile(filePath) {
  // Open the file for writing
  const stream = fs.createWriteStream(filePath);

  // select environment variables and write them to the file
  const { VITE_API_URL } = process.env;

  for (const [key, value] of Object.entries({ HOSTED_AT, VITE_API_URL })) {
    stream.write(`${key}=${value}\n`);
  }

  // Close the file stream
  stream.end();

  console.log(`Environment variables written to ${filePath}`);
}

setUpClientEnvironment();
