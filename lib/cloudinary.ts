// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: string, folder: string = 'enrollments') {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
      transformation: [{ quality: 'auto:good' }],
    });
    return { success: true, url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return { success: false, error };
  }
}

export default cloudinary;