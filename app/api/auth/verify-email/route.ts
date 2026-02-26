import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/User';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  
  // Default target agar koi masla ho
  let targetUrl = '/login?error=verification-failed';

  // 1. Initial Token Check
  if (!token) {
    redirect('/login?error=invalid-token');
  }

  try {
    await connectDB();

    // 2. Find valid and non-expired token user
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() }, // Professional Date comparison
    });

    if (!user) {
      targetUrl = '/login?error=token-expired';
    } else {
      // 3. Privacy & Security: Clear sensitive tokens after use
      user.isEmailVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;
      
      await user.save();
      
      // 4. Success Target
      targetUrl = '/login?verified=true';
      console.log(`✅ Email verified successfully for: ${user.email}`);
    }
  } catch (error) {
    console.error('❌ Verification Error Logic:', error);
    // targetUrl already set to 'verification-failed'
  }

  // 5. FINAL REDIRECT (Outside try-catch to avoid NEXT_REDIRECT error)
  redirect(targetUrl);
}
