//controller is for forms api endpoints
//get form page
//sign form for upload
//post sign form for upload

import type { Request, Response } from "express";

import signature from "../utilities/signuploadform.js";

// const postSignForm = async (req: Request, res: Response) => {
//   const userId = req.user._id;
//   console.log("req.body sign form", req.body);

//   const enviroment = process.env.NODE_ENV;

//   //requested folder user wants to upload to
//   //todo folder validation. Does user have auth to save in this folder maybe its a company folder
//   let desiredFolder = `${req.body?.folder ? req.body.folder : "no_folder"}`;

//   if (enviroment == "development") {
//     desiredFolder = "testfolder/" + desiredFolder;
//   }

//   //folder to organize this image in
//   //composed of folder requested by user and the userId
//   const imageFolder = `${desiredFolder}/${userId}`;

//   const sig = signature.signuploadform(imageFolder);

//   console.log(`signform signature received `, sig);

//   try {
//     res.status(200).json({
//       signature: sig.signature,
//       timestamp: sig.timestamp,
//       cloudname: process.env.cloud_name,
//       apikey: process.env.cloud_key,
//       folder: imageFolder,
//     });
//   } catch (error) {}
// };

const signForm = async (req: Request, res: Response) => {
  // @ts-expect-error user will exist from auth middleware
  const userId = req.user._id;

  //requested folder user wants to upload to
  //todo folder validation. Does user have auth to save in this folder maybe its a company folder

  let desiredFolder = `${req.query?.folder ? req.query.folder : "no_folder"}`;

  //add any images in dev to specific folder to delete
  if (process.env.NODE_ENV == "development") {
    desiredFolder = "dev_environment/" + desiredFolder;
  }

  //folder to organize this image in
  //composed of folder requested by user and the userId
  const imageFolder = `${desiredFolder}/${userId}`;

  const sig = signature.signuploadform(imageFolder);

  console.log(`signform signature received `, sig);

  try {
    res.status(200).json({
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudname: process.env.cloud_name,
      apikey: process.env.cloud_key,
      folder: imageFolder,
    });
  } catch (error) {}
};

module.exports = { signForm };
