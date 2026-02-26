import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from '@/lib/utils/jwt';
import { successResponse, errorResponse } from '@/lib/utils/apiResponse';
import { addSecurityHeaders } from '@/lib/middleware/security';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    let accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    let payload: any = null;

    // 1. Verify accessToken
    if (accessToken) {
      payload = verifyAccessToken(accessToken);
    }

    // 2. Refresh Logic (If accessToken expired but refreshToken exists)
    let newAccessTokenGenerated = false;
    let newAccessToken = '';

    if (!payload && refreshToken) {
      const refreshPayload = verifyRefreshToken(refreshToken);
      
      if (!refreshPayload) {
        const res = NextResponse.json({ message: 'Session expired' }, { status: 401 });
        res.cookies.delete('accessToken');
        res.cookies.delete('refreshToken');
        return addSecurityHeaders(res);
      }

      // Generate new accessToken
      newAccessToken = generateAccessToken({
        userId: refreshPayload.userId,
        email: refreshPayload.email,
        role: refreshPayload.role,
        sessionId: refreshPayload.sessionId,
        deviceFingerprint: refreshPayload.deviceFingerprint,
      });

      accessToken = newAccessToken;
      payload = refreshPayload;
      newAccessTokenGenerated = true;
    }

    // 3. Final Payload Check
    if (!payload) {
      const res = NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      res.cookies.delete('accessToken');
      return addSecurityHeaders(res);
    }

    // 4. Fetch user
    const user = await User.findById(payload.userId).select('-password');
    if (!user) return addSecurityHeaders(errorResponse('User not found', 404));

    // 5. Build Response (DO NOT use NextResponse.next() here)
    const responseData = successResponse({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        isEmailVerified: user.isEmailVerified,
      },
    });

    const res = addSecurityHeaders(responseData);

    // 6. If we generated a new token, set it in cookie
    if (newAccessTokenGenerated) {
      res.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
      });
    }

    return res;

  } catch (err) {
    console.error('Me API Error:', err);
    return addSecurityHeaders(NextResponse.json({ message: 'Internal server error' }, { status: 500 }));
  }
}
