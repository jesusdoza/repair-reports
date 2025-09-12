import config from "./config.js";
import { v2 as cloudinary } from "cloudinary";

const cloud_name = config.CLOUDINARY_CLOUD_NAME;
const api_key = config.CLOUDINARY_CLOUD_KEY;
const api_secret = config.CLOUDINARY_CLOUD_SECRET;

cloudinary.config({
  api_key,
  api_secret,
  cloud_name,
});

export default cloudinary;
