import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/connect';
import Session from '@/lib/db/models/Session';
import { verifyAccessToken } from '@/lib/utils/jwt';
import { successResponse, errorResponse } from '@/lib/utils/apiResponse';
import { addSecurityHeaders } from '@/lib/middleware/security';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value;

    if (token) {
      try {
        const payload = verifyAccessToken(token);
        await connectDB();
        
        // Invalidate session in database
        await Session.updateOne(
          { userId: payload.userId, refreshToken: payload.sessionId },
          { $set: { isValid: false } }
        );
      } catch (error) {
        // Token invalid, continue with cookie clearing
      }
    }

    const response = successResponse(null, 'Logged out successfully');

    // Clear all auth cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 0,
      path: '/',
    };

    response.cookies.set('accessToken', '', cookieOptions);
    response.cookies.set('refreshToken', '', cookieOptions);
    response.cookies.set('csrf-token', '', { ...cookieOptions, httpOnly: false });

    return addSecurityHeaders(response);
  } catch (error) {
    return addSecurityHeaders(errorResponse('Logout failed', 500));
  }
}