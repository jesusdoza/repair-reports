const axios = require("axios").default;
const cloudinary = require("cloudinary").v2;
const signatureUtility = require("../../utilities/signuploadform");

const router = require("express").Router();

const CLOUD_NAME = process.env.CLOUD_NAME;
const RESOURCE_TYPE = "image";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${RESOURCE_TYPE}/destroy`;

const deleteImage = async (req, res) => {
  const { imageId } = req.body;
  const signature = signatureUtility.signuploadform();

  //TODO get secrets and signature
  const body = { signature, api_key, timestamp, public_id };

  const response = await cloudinary.v2.uploader.destroy(imageId, {
    signature,
  });

  // const response = await axios.post(API_URL, { body });

  //TODO do something with cloud response
  console.log("response", response);

  res.send({
    route: "images delete",
    body: req.body,
  });
};

module.exports = { deleteImage };
