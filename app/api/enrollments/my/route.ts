// app/api/enrollments/my/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';
// GET: Get current user's enrollments
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get email from query (you can change this to get from auth session)
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const userId = searchParams.get('userId');

    if (!email && !userId) {
      return NextResponse.json(
        { success: false, message: 'Email or UserId required' },
        { status: 400 }
      );
    }

    const query: any = {};
    if (email) query['student.email'] = email;
    if (userId) query['student.userId'] = userId;

    const enrollments = await Enrollment.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}