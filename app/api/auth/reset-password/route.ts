import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/User';

// 1. GET Method: Token ki validity check karne ke liye (Page load par)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, message: 'Token is required' }, { status: 400 });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }, // Check expiry
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Token is valid' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// 2. POST Method: Naya password save karne ke liye
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { token, password } = await request.json();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 400 });
    }

    // Password update (Hashing aapke User model ke pre-save hook mein ho rahi hogi)
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
