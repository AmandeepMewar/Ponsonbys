import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'image',
      folder: 'ponsonbys',
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(`Cloudinary uploading error: ${error.message}`);
    fs.unlinkSync(localFilePath);
    return null;
  }
}

export async function deleteFromCloudinary(publicId) {
  try {
    await cloudinary.uploader.destroy(`ponsonbys/${publicId}`);
    console.log('deleted image from cloudinary');
  } catch (error) {
    console.log(`Cloudinary deleting error: ${error.message}`);
  }
}
