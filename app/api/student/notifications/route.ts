// app/api/student/notifications/route.ts
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

    // Get enrollments for notifications context
    const enrollments = await Enrollment.find({ 'student.email': email })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean();

    // Generate notifications based on enrollment status
    const notifications = [];

    enrollments.forEach(e => {
      // Status change notifications
      if (e.status === 'confirmed' && !e.notificationsSent?.studentEmail) {
        notifications.push({
          id: `conf-${e._id}`,
          type: 'success',
          title: 'Enrollment Confirmed!',
          message: `Your payment for ${e.course.title} has been verified.`,
          date: e.updatedAt,
          read: false,
          actionUrl: `/dashboard/enrollments`,
          actionText: 'View Details'
        });
      }

      if (e.status === 'active') {
        notifications.push({
          id: `active-${e._id}`,
          type: 'info',
          title: 'Course Started',
          message: `${e.course.title} is now active. Start learning!`,
          date: e.updatedAt,
          read: true,
          actionUrl: `/courses/${e.course.slug}`,
          actionText: 'Start Learning'
        });
      }

      if (e.status === 'completed') {
        notifications.push({
          id: `cert-${e._id}`,
          type: 'success',
          title: 'Course Completed!',
          message: `Congratulations! Download your certificate for ${e.course.title}.`,
          date: e.updatedAt,
          read: false,
          actionUrl: `/dashboard/certificates`,
          actionText: 'Get Certificate'
        });
      }
    });

    // General notifications
    notifications.push(
      {
        id: 'welcome',
        type: 'info',
        title: 'Welcome to CodeEarn',
        message: 'Complete your profile to get personalized course recommendations.',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        read: true,
        actionUrl: '/dashboard/settings',
        actionText: 'Complete Profile'
      },
      {
        id: 'tip-1',
        type: 'tip',
        title: 'Learning Tip',
        message: 'Consistency is key! Try to study at least 30 minutes daily.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        read: false,
        actionUrl: null,
        actionText: null
      }
    );

    // Sort by date, unread first
    notifications.sort((a, b) => {
      if (a.read !== b.read) return a.read ? 1 : -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json({
      success: true,
      data: {
        notifications,
        unreadCount: notifications.filter(n => !n.read).length
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}