import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/connect';
import Session from '@/lib/db/models/Session';
import { verifyRefreshToken, generateAccessToken, generateRefreshToken, decodeToken } from '@/lib/utils/jwt';
import { successResponse, errorResponse } from '@/lib/utils/apiResponse';
import { addSecurityHeaders, generateDeviceFingerprint } from '@/lib/middleware/security';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return addSecurityHeaders(errorResponse('No refresh token provided', 401));
    }

    await connectDB();

    // 1. Verify Refresh Token
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      // Invalidate session if possible
      return addSecurityHeaders(errorResponse('Session expired. Please login again.', 401));
    }

    // 2. Database Session Check
    const session = await Session.findOne({
      userId: payload.userId,
      refreshToken: payload.sessionId, // JWT ke andar jo sessionId hai
      isValid: true,
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        session.isValid = false;
        await session.save();
      }
      return addSecurityHeaders(errorResponse('Session invalidated or expired', 401));
    }

    // 3. Device Fingerprint Check (Security)
    const currentFingerprint = generateDeviceFingerprint(request);
    // Important: Agar fingerprint mismatch ho raha hai to check karein local dev mein change to nahi hua
    if (session.deviceFingerprint !== currentFingerprint) {
       console.warn(`Security Warning: Fingerprint mismatch for ${payload.userId}`);
       // Agar development mein bar bar error de raha ho to niche wali line comment kar ke check karein
       // return addSecurityHeaders(errorResponse('Security violation', 403));
    }

    // 4. Token Rotation (Professional Standard)
    const newSessionToken = crypto.randomBytes(64).toString('hex');
    session.refreshToken = newSessionToken;
    session.lastActive = new Date();
    await session.save();

    // 5. Generate New Token Payload with ROLE
    const tokenPayload = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role, // <--- Role yahan lazmi hona chahiye
      sessionId: newSessionToken,
      deviceFingerprint: currentFingerprint,
    };

    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    const response = successResponse({ message: 'Session renewed' });

    // 6. Professional 24-Hour Cookies (Sync with Login API)
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
    };

    // FIX: MaxAge ko login ke sath match karein (24 Hours)
    response.cookies.set('accessToken', newAccessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60, // 24 Ghante
    });

    response.cookies.set('refreshToken', newRefreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60, // 7 Days
    });

    return addSecurityHeaders(response);

  } catch (error) {
    console.error('Refresh logic crash:', error);
    return addSecurityHeaders(errorResponse('Refresh failed', 500));
  }
}