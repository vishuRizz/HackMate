const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  CLOUDINARY_NAME: "djy902nwd",
  CLOUDINARY_API_KEY: "615952133756342",
  CLOUDINARY_API_SECRET: "5CsrsHHaP4WuAGuNklG9BYiWzb4",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hackmate", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };

