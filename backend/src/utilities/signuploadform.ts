import cloudinary from "cloudinary";

import config from "../config/config.js";
const { CLOUDINARY_CLOUD_SECRET: apiSecret } = config;

// Server-side function used to sign an upload form for cloudinary
const signuploadform = (folderName: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
      // eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
      folder: folderName, //has to match on client side too
    },
    apiSecret
  );
  return { timestamp, signature };
};

//exporting this particular function
export default {
  signuploadform,
};
