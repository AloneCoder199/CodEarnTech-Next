import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect'; // Database connection import
import User from '@/lib/db/models/User';   // User Model import

/**
 * Professional Punishment System API
 * Tracking Unauthorised Private Route Hits
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Data extract karein
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ ok: false, message: "User ID is required" }, { status: 400 });
    }

    // 2. Database connect karein
    await connectDB();

    // 3. User find karein
    const user = await User.findById(userId);

    if (user) {
      // 4. Violation track karein (Model method 3 warnings ke baad 24h block karega)
      const currentViolations = await user.trackViolation();
      
      console.log(`⚠️ Security Warning: User ${user.email} has ${currentViolations} violations.`);
      
      return NextResponse.json({ 
        ok: true, 
        violations: currentViolations,
        message: "Violation tracked successfully" 
      });
    }

    return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });

  } catch (error: any) {
    console.error('Violation Tracking Error:', error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
