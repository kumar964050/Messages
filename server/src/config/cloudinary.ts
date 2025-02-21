const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (imgFile: any, folderName: string) => {
  const dirName = `messages/${folderName}`;
  const result = await cloudinary.uploader.upload(imgFile.tempFilePath, {
    folder: dirName,
  });
  return {
    id: result.public_id,
    url: result.secure_url,
  };
};

export const removeImage = async (id: string) => {
  return await cloudinary.uploader.destroy(id);
};
