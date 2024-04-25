const { cloudinary } = require("../../config/cloudinarySdk");
const signatureUtility = require("../../utilities/signuploadform");

const deleteImage = async (req, res) => {
  const { imageId } = req.body;

  const { signature, timestamp } = signatureUtility.signuploadform();
  console.log("cloudinary.config", cloudinary.config());

  // const response = await cloudinary.destroy(imageId, { timestamp, signature });

  //TODO do something with cloud response
  // console.log("response", response);

  res.send({
    route: "images delete",
    body: req.body,
  });
};

module.exports = { deleteImage };
