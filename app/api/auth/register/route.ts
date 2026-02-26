import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { registerSchema } from '@/lib/validations/auth';
import { successResponse, errorResponse } from '@/lib/utils/apiResponse';
import { sendVerificationEmail } from '@/lib/email/sendEmail';
import { checkRateLimit } from '@/lib/utils/rateLimiter';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // 1. Enhanced IP Detection for Privacy & Security
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (request as any).ip || '127.0.0.1';

    // 2. Rate Limiting (Brute force protection)
    // Ek IP se 1 ghante mein sirf 3 accounts ban saktay hain
    if (!checkRateLimit(`register_${ip}`, 3, 60 * 60 * 1000)) { 
      return errorResponse('Too many registration attempts. Please try again later.', 429);
    }

    await connectDB();

    const body = await request.json();
    
    // 3. Zod Validation
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return errorResponse('Validation failed', 400, result.error.flatten().fieldErrors);
    }

    const { email, password, firstName, lastName, phone } = result.data;

    // 4. Duplicate Check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse('This email is already registered with us.', 409);
    }

    // 5. Generate Secure Verification Token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 Hours valid

    // 6. Create User (Password hashing Model level par ho rahi hai)
    const user = await User.create({
      email,
      password,
      profile: {
        firstName,
        lastName,
        phone,
      },
      verificationToken,
      verificationTokenExpires: tokenExpiry,
      isEmailVerified: false, // Default false for privacy
    });

    // 7. Send Professional Verification Email
    // Is function mein aapka verification link /api/auth/verify-email?token=... hona chahiye
    try {
        await sendVerificationEmail(email, verificationToken, firstName);
    } catch (emailError) {
        console.error('Email service failed:', emailError);
        // User create ho chuka hai, lekin email nahi gayi. Hum error nahi bhejenge taake user login karke resend kar sakay
    }

    // 8. Success Response (No Login Cookies yet for Security)
    // Frontend is response ke baad user ko /verify-email page par redirect karega
    return successResponse(
      {
        email: user.email,
        redirectTo: '/verify-email',
      },
      'Account created! Please check your email to verify your account.',
      201
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return errorResponse('Internal server error. Please try again later.', 500);
  }
}
