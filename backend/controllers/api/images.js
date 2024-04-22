const router = require("express").Router();

const API_URL =
  "https://api.cloudinary.com/v1_1/{{cloud_name}}/:resource_type/destroy";

module.exports = {
  deleteImage: async (req, res) => {
    res.send({ route: "images delete", body: req.body });

    // https://api.cloudinary.com/v1_1/{{cloud_name}}/:resource_type/destroy
  },
};
