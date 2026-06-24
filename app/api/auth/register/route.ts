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
    if (!checkRateLimit(`register_${ip}`, 3, 60 * 60 * 1000)) {
      return errorResponse('Too many registration attempts. Please try again later.', 429);
    }

    await connectDB();

    const body = await request.json();

    // 3. Zod Validation
    console.log('📦 Register body received:', JSON.stringify(body, null, 2));
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      console.error('❌ Zod validation failed:', JSON.stringify(fieldErrors, null, 2));
      return errorResponse('Validation failed', 400, fieldErrors);
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

    // ── NEW: DIRECT SEQUENTIAL STUDENT ID GENERATION ──────────────────────────
    // Database se sabse aakhri user nikalen jiski ID "CET-" se start hoti ho
    const lastUser = await User.findOne({ studentId: /^CET-/ })
      .sort({ studentId: -1 })
      .select('studentId')
      .lean();

    let nextNumber = 1;

    if (lastUser && lastUser.studentId) {
      // "CET-0001" se number extract karein
      const lastIdNumber = parseInt(lastUser.studentId.replace('CET-', ''), 10);
      if (!isNaN(lastIdNumber)) {
        nextNumber = lastIdNumber + 1;
      }
    }

    // Padded 4 digits format (CET-0001, CET-0002). Agar sirf CET-01 chahiye to padStart(2, '0') kar dein.
    const generatedStudentId = `CET-${String(nextNumber).padStart(4, '0')}`;
    // ──────────────────────────────────────────────────────────────────────────

    // 6. Create User (Explicitly passing studentId here)
    const user = await User.create({
      email,
      password,
      studentId: generatedStudentId, // <--- Direct Insertion Guarantee!
      profile: {
        firstName,
        lastName,
        phone,
        avatar: "",
      },
      verificationToken,
      verificationTokenExpires: tokenExpiry,
      isEmailVerified: false,
    });

    // 7. Send Professional Verification Email
    try {
      await sendVerificationEmail(email, verificationToken, firstName);
    } catch (emailError) {
      console.error('Email service failed:', emailError);
    }

    // 8. Success Response
    return successResponse(
      {
        email: user.email,
        studentId: user.studentId, 
        redirectTo: '/verify-email',
      },
      'Account created successfully! Please check your email to verify your account.',
      201
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return errorResponse('Internal server error. Please try again later.', 500);
  }
}