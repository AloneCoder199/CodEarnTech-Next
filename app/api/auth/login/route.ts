import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import Session from '@/lib/db/models/Session';
import { loginSchema } from '@/lib/validations/auth';
import { generateAccessToken, generateRefreshToken } from '@/lib/utils/jwt';
import {
  advancedRateLimit,
  generateDeviceFingerprint,
  addSecurityHeaders,
  isSuspiciousIP,
} from '@/lib/middleware/security';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // IP
    const xForwardedFor = request.headers.get('x-forwarded-for');
    const ip =
      xForwardedFor?.split(',')[0].trim() ||
      (request as any).ip ||
      '127.0.0.1';

    // Validate input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return addSecurityHeaders(
        NextResponse.json(
          { message: 'Validation failed', errors: result.error.flatten().fieldErrors },
          { status: 400 }
        )
      );
    }

    const { email, password } = result.data;

    // Rate limit
    const rateLimit = advancedRateLimit(
      `login_${email}`,
      5,
      15 * 60 * 1000,
      60 * 60 * 1000
    );
    if (!rateLimit.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            message: `Too many attempts. Try again in ${Math.ceil(
              rateLimit.retryAfter! / 60
            )} minutes`,
          },
          { status: 429 }
        )
      );
    }

    if (isSuspiciousIP(request)) {
      console.warn(`Suspicious login attempt from ${ip}`);
    }

    // User check
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return addSecurityHeaders(
        NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
      );
    }

    // Locked
    if (user.lockUntil && user.lockUntil.getTime() > Date.now()) {
      const minutesLeft = Math.ceil(
        (user.lockUntil.getTime() - Date.now()) / 60000
      );
      return addSecurityHeaders(
        NextResponse.json(
          { message: `Account locked. Try again in ${minutesLeft} minutes.` },
          { status: 423 }
        )
      );
    }

    // Password verify
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      await user.incLoginAttempts();
      return addSecurityHeaders(
        NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
      );
    }
     
   

    if (!user.isEmailVerified) {
      return addSecurityHeaders(
        NextResponse.json(
          { message: 'Please verify your email' },
          { status: 403 }
        )
      );
    }

    // Reset attempts
    await User.updateOne(
      { _id: user._id },
      { $set: { loginAttempts: 0 }, $unset: { lockUntil: 1 } }
    );

    // Device
    const deviceFingerprint = generateDeviceFingerprint(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await Promise.all([
  // Purane kachra sessions saaf karo
  Session.deleteMany({ 
    userId: user._id, 
    $or: [{ isValid: false }, { expiresAt: { $lt: new Date() } }] 
  }),
  // Is device ka purana active session invalid karo
  Session.updateMany(
    { userId: user._id, deviceFingerprint, isValid: true },
    { $set: { isValid: false } }
  )
]);


    const sessionToken = crypto.randomBytes(64).toString('hex');
    await Session.create({
      userId: user._id,
      refreshToken: sessionToken,
      deviceFingerprint,
      userAgent,
      ip,
      isValid: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const dashboardPath =
      user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      sessionId: sessionToken,
      deviceFingerprint,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const csrfToken = crypto.randomBytes(32).toString('hex');

    // ✅ MAIN FIX: NextResponse
    const response = NextResponse.json({
      success: true,
      redirectTo: dashboardPath,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    response.cookies.set('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60,
    });

    response.cookies.set('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60,
    });

    response.cookies.set('csrf-token', csrfToken, {
      ...cookieOptions,
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60,
    });


   if (!accessToken || !refreshToken) {
  console.error('Tokens missing:', { accessToken, refreshToken });
  return NextResponse.json(
    { message: 'Token generation failed' },
    { status: 500 }
  );
}

    return addSecurityHeaders(response);
  } catch (err) {
    console.error('Login error:', err);
    return addSecurityHeaders(
      NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    );
  }
}