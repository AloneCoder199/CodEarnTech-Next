// app/api/student/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

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

    // Overall stats
    const stats = await Enrollment.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalEnrollments: { $sum: 1 },
          activeCourses: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          completedCourses: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          pendingCourses: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          confirmedCourses: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
          },
          totalSpent: { $sum: '$payment.amount' },
          totalHours: { $sum: { $toInt: '$course.duration' } }
        }
      }
    ]);

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await Enrollment.find({
      ...query,
      updatedAt: { $gte: thirtyDaysAgo }
    })
    .sort({ updatedAt: -1 })
    .limit(10)
    .lean();

    // Learning streak (mock data - implement actual logic later)
    const learningStreak = {
      currentStreak: 5,
      longestStreak: 12,
      totalStudyHours: 48,
      weeklyGoal: 10,
      weeklyProgress: 7
    };

    // Upcoming deadlines (mock for now)
    const upcomingDeadlines = [
      {
        title: 'React Assignment 3',
        course: 'React Fundamentals',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        type: 'assignment'
      },
      {
        title: 'JavaScript Quiz',
        course: 'Advanced JavaScript',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        type: 'quiz'
      }
    ];

    // Achievements
    const achievements = [
      { id: 1, title: 'First Course', description: 'Enrolled in your first course', icon: '🎯', unlocked: true, date: new Date() },
      { id: 2, title: 'Quick Starter', description: 'Completed first module within 24 hours', icon: '⚡', unlocked: true, date: new Date() },
      { id: 3, title: 'Consistent Learner', description: '7-day learning streak', icon: '🔥', unlocked: learningStreak.currentStreak >= 7, progress: learningStreak.currentStreak },
      { id: 4, title: 'Course Master', description: 'Complete 3 courses', icon: '🏆', unlocked: (stats[0]?.completedCourses || 0) >= 3, progress: stats[0]?.completedCourses || 0, target: 3 },
      { id: 5, title: 'Top Performer', description: 'Score 90%+ in any assessment', icon: '⭐', unlocked: false, progress: 0, target: 1 }
    ];

    return NextResponse.json({
      success: true,
      data: {
        overview: stats[0] || {
          totalEnrollments: 0,
          activeCourses: 0,
          completedCourses: 0,
          pendingCourses: 0,
          confirmedCourses: 0,
          totalSpent: 0,
          totalHours: 0
        },
        learningStreak,
        recentActivity,
        upcomingDeadlines,
        achievements
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}