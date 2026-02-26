import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { forgotPasswordSchema } from '@/lib/validations/auth';
import { successResponse, errorResponse } from '@/lib/utils/apiResponse';
import { sendPasswordResetEmail } from '@/lib/email/sendEmail';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // 1. Zod Validation
    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return errorResponse('Please enter a valid email address.', 400);
    }

    const { email } = result.data;

    // 2. User Existence Check (Professional Validation)
    const user = await User.findOne({ email });
    
    if (!user) {
      // Shahzada Logic: Agar account nahi hai to 404 bhejien
      // Taake frontend Alert mein 'Register' link dikha sakay
      return errorResponse('No account found with this email address.', 404);
    }

    // 3. Generate Secure Reset Token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // 4. Update User Model
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour valid
    await user.save();

    // 5. Send Professional Email
    try {
      await sendPasswordResetEmail(email, resetToken, user.profile.firstName);
    } catch (emailError) {
      console.error('Email Send Error:', emailError);
      return errorResponse('Failed to send reset email. Please try again later.', 500);
    }

    return successResponse(null, 'A password reset link has been sent to your email.');

  } catch (error: any) {
    console.error('Forgot password error:', error);
    return errorResponse('Internal server error. Please try again.', 500);
  }
}
