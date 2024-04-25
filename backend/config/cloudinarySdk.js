const cloudinary = require("cloudinary").v2;

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.cloud_key;
const api_secret = process.env.cloud_secret;
// const RESOURCE_TYPE = "image";
// const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${RESOURCE_TYPE}/destroy`;

cloudinary.config({
  api_key,
  api_secret,
  cloud_name,
});

module.exports = { cloudinary };
