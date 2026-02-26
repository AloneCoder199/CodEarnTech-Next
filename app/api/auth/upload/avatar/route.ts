import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import Session from '@/lib/db/models/Session';
import { uploadImage, deleteImage } from '@/lib/cloudinary/config';
import { verifyAccessToken } from '@/lib/utils/jwt';
import { successResponse, errorResponse } from '@/lib/utils/apiResponse';
import { advancedRateLimit, generateDeviceFingerprint, addSecurityHeaders } from '@/lib/middleware/security';

// Allowed MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    // 1. FIX: Safe IP extraction for Rate Limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (request as any).ip || 'anonymous';
    
    // Rate limiting for uploads
    const rateLimit = advancedRateLimit(`upload_${ip}`, 10, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return addSecurityHeaders(errorResponse('Upload limit exceeded. Try again in an hour.', 429));
    }

    // Verify authentication
    const token = request.cookies.get('accessToken')?.value;
    if (!token) {
      return addSecurityHeaders(errorResponse('Unauthorized access', 401));
    }

    const payload = verifyAccessToken(token);
    
    // Verify device fingerprint (Security Fix)
    const deviceFingerprint = generateDeviceFingerprint(request);
    if (payload.deviceFingerprint && payload.deviceFingerprint !== deviceFingerprint) {
      return addSecurityHeaders(errorResponse('Security violation: Device mismatch', 403));
    }

    // Check session validity
    await connectDB();
    const session = await Session.findOne({
      userId: payload.userId,
      // Note: Make sure payload.sessionId matches your JWT structure
      refreshToken: payload.sessionId, 
      isValid: true,
    });

    if (!session) {
      return addSecurityHeaders(errorResponse('Session expired or invalidated', 401));
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file || !(file instanceof File)) {
      return addSecurityHeaders(errorResponse('No valid image file provided', 400));
    }

    // Security validations
    if (!ALLOWED_TYPES.includes(file.type)) {
      return addSecurityHeaders(errorResponse('Invalid file type. Only JPG, PNG, WebP allowed', 400));
    }

    if (file.size > MAX_SIZE) {
      return addSecurityHeaders(errorResponse('File too large. Max 5MB allowed', 400));
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Additional security: Check file signature (magic numbers)
    const fileSignature = buffer.slice(0, 4).toString('hex');
    // Common image signatures
    const isJpeg = fileSignature.startsWith('ffd8ff');
    const isPng = fileSignature.startsWith('89504e47');
    const isWebp = fileSignature.slice(16, 24) === '57454250'; // "WEBP" in hex
    
    if (!isJpeg && !isPng && !isWebp) {
      return addSecurityHeaders(errorResponse('Invalid image format detected', 400));
    }

    // Get user to check existing avatar
    const user = await User.findById(payload.userId);
    if (!user) {
      return addSecurityHeaders(errorResponse('User account not found', 404));
    }

    // Delete old avatar from Cloudinary if exists
    if (user.profile && user.profile.avatar) {
      try {
        const publicId = user.profile.avatar.split('/').pop()?.split('.')[0];
        if (publicId) {
          // Path folder ke sath match hona chahiye jo config mein hai
          await deleteImage(`codeearn/avatars/${publicId}`);
        }
      } catch (error) {
        console.error('Cloudinary delete error:', error);
      }
    }

    // Upload to Cloudinary
    const result = await uploadImage(buffer, 'codeearn/avatars');

    // Update user profile
    if (user.profile) {
      user.profile.avatar = result.secure_url;
    }
    
    await user.save();

    // Update session last active
    session.lastActive = new Date();
    await session.save();

    const response = successResponse({
      avatar: result.secure_url,
    }, 'Profile picture updated successfully');

    return addSecurityHeaders(response);

  } catch (error: any) {
    console.error('Upload Process Error:', error);
    return addSecurityHeaders(errorResponse('Server error during upload', 500));
  }
}
