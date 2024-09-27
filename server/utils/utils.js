const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const generateFileName = (file) => {
  return (
    Date.now() +
    "-" +
    Math.random().toString(36).substring(2, 10) +
    file.originalname
  );
};



const uploadCloudinary = (file) => {
    return new Promise((resolve, reject) => {
      try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
          });
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "post_images" },
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              reject(new Error("Failed to upload file to Cloudinary"));
            } else {
              resolve({url:result.secure_url,public_id:result.public_id});
            }
          }
        );
  
        if (file && file.buffer) {
          uploadStream.end(file.buffer);
        } else {
          reject(new Error("Invalid file data"));
        }
      } catch (error) {
        console.error("Upload failed:", error);
        reject(new Error("Failed to upload file to Cloudinary"));
      }
    });
  };

  const removeFile = (public_id)=>{
    return new Promise((resolve,reject)=>{
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
          });
        cloudinary.uploader.destroy(public_id, (error, result) => {
            if (error) {
              console.error("Error deleting file from Cloudinary:", error);
              reject(new Error("Failed to delete file from Cloudinary"));
            } else {
              resolve(result);
            }
          });
    })
  }
  

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateFileName,
  uploadCloudinary,
  removeFile
};
