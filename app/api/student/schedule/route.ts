// app/api/student/schedule/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email required' },
        { status: 400 }
      );
    }

    // Get active and confirmed enrollments
    const enrollments = await Enrollment.find({
      'student.email': email,
      status: { $in: ['active', 'confirmed'] }
    }).lean();

    // Generate schedule (mock data - integrate with actual LMS later)
    const schedule = enrollments.flatMap(e => {
      const baseDate = new Date();
      const batchTime = e.preferredBatch === 'morning' ? '09:00' :
                       e.preferredBatch === 'evening' ? '18:00' : '10:00';
      
      // Mock schedule for next 7 days
      return Array.from({ length: 5 }, (_, i) => ({
        id: `${e._id}-${i}`,
        enrollmentId: e.enrollmentId,
        courseTitle: e.course.title,
        courseSlug: e.course.slug,
        date: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
        time: batchTime,
        duration: '2 hours',
        type: i % 2 === 0 ? 'live-session' : 'assignment',
        title: i % 2 === 0 ? `Live Class: Module ${i + 1}` : `Assignment: Practice ${i + 1}`,
        status: i === 0 ? 'upcoming' : i === 1 ? 'live' : 'scheduled',
        joinUrl: i % 2 === 0 ? `https://meet.codeearn.com/${e.enrollmentId}-${i}` : null,
        materials: [
          { name: 'Slides', url: '#' },
          { name: 'Code Files', url: '#' }
        ]
      }));
    }).slice(0, 10); // Limit to 10 upcoming items

    return NextResponse.json({
      success: true,
      data: {
        schedule,
        upcomingCount: schedule.filter(s => s.status === 'upcoming').length,
        liveNow: schedule.filter(s => s.status === 'live').length
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}