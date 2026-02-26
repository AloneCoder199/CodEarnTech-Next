// app/api/enrollments/check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';

// GET: Check if user is already enrolled in a course
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const courseId = searchParams.get('courseId');

    if (!email || !courseId) {
      return NextResponse.json(
        { success: false, message: 'Email and courseId required' },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findOne({
      'student.email': email,
      'course.courseId': courseId,
      status: { $nin: ['cancelled'] }
    }).lean();

    return NextResponse.json({
      success: true,
      enrolled: !!enrollment,
      enrollment: enrollment || null
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}