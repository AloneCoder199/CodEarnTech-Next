import cloudinary from './config';

export async function uploadCourseThumbnail(fileBuffer: Buffer, courseSlug: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'codeearn/courses/thumbnails',
        public_id: `course_${courseSlug}`,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
          { width: 1280, height: 720, crop: 'fill' }, // 16:9 ratio
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload failed'));
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export async function uploadPaymentScreenshot(fileBuffer: Buffer, paymentId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'codeearn/payments/screenshots',
        public_id: `payment_${paymentId}`,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [
          { width: 1080, crop: 'limit' },
          { quality: 'auto:eco' },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload failed'));
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export async function deleteCourseThumbnail(courseSlug: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(`codeearn/courses/thumbnails/course_${courseSlug}`);
  } catch (error) {
    console.error('Error deleting thumbnail:', error);
  }
}