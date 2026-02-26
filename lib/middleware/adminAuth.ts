import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/utils/jwt';
import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { errorResponse } from '@/lib/utils/apiResponse';
import { addSecurityHeaders } from '@/lib/middleware/security';

export async function verifyAdmin(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    
    if (!token) {
      return { error: errorResponse('Unauthorized', 401) };
    }

    const payload = verifyAccessToken(token);
    await connectDB();

    const user = await User.findById(payload.userId);
    
    if (!user || user.role !== 'admin') {
      return { error: addSecurityHeaders(errorResponse('Forbidden: Admin access required', 403)) };
    }

    return { userId: user._id.toString(), user };
  } catch (error) {
    return { error: addSecurityHeaders(errorResponse('Invalid token', 401)) };
  }
}