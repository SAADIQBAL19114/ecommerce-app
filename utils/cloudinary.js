const { v2  } = require("cloudinary");
const fs = require("fs");

v2.config({
  cloud_name: "saadecommerce",
  api_key: "515774827173175",
  api_secret: "LKYdi-ba2rTKglSc2y_Ups19HhY",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  try {
    const publicId = imageUrl.split("/").pop().split(".")[0];

    const result = await v2.uploader.destroy(publicId);

    return result.result === "ok";
} catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
