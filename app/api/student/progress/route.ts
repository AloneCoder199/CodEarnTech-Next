// app/api/student/progress/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const enrollmentId = searchParams.get('enrollmentId');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email required' },
        { status: 400 }
      );
    }

    // If specific enrollment requested
    if (enrollmentId) {
      const enrollment = await Enrollment.findOne({
        _id: enrollmentId,
        'student.email': email
      }).lean();

      if (!enrollment) {
        return NextResponse.json(
          { success: false, message: 'Enrollment not found' },
          { status: 404 }
        );
      }

      // Mock progress data (replace with actual progress tracking later)
      const progress = {
        overallCompletion: enrollment.status === 'completed' ? 100 : 
                          enrollment.status === 'active' ? 65 :
                          enrollment.status === 'confirmed' ? 0 : 0,
        modulesCompleted: enrollment.status === 'completed' ? enrollment.course.totalModules :
                         enrollment.status === 'active' ? Math.floor(enrollment.course.totalModules * 0.6) : 0,
        totalModules: enrollment.course.totalModules,
        topicsCompleted: enrollment.status === 'completed' ? enrollment.course.totalTopics :
                        enrollment.status === 'active' ? Math.floor(enrollment.course.totalTopics * 0.55) : 0,
        totalTopics: enrollment.course.totalTopics,
        assessmentsTaken: 3,
        averageScore: 85,
        timeSpent: '24h 30m',
        lastAccessed: new Date(),
        certificateEligible: enrollment.status === 'completed',
        certificateUrl: enrollment.status === 'completed' ? `/certificates/${enrollment.enrollmentId}.pdf` : null,
        nextLesson: enrollment.status === 'active' ? {
          title: 'Advanced React Hooks',
          module: 'Module 4: State Management',
          duration: '45 min',
          type: 'video'
        } : null,
        recentActivity: [
          { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), action: 'Completed Lesson', item: 'useEffect Deep Dive', timeSpent: '45 min' },
          { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), action: 'Submitted Assignment', item: 'Todo App Project', score: 92 },
          { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), action: 'Watched Video', item: 'Custom Hooks Tutorial', timeSpent: '30 min' }
        ]
      };

      return NextResponse.json({
        success: true,
        data: { enrollment, progress }
      });
    }

    // All enrollments progress
    const enrollments = await Enrollment.find({ 'student.email': email })
      .sort({ createdAt: -1 })
      .lean();

    const progressSummary = enrollments.map(e => ({
      enrollmentId: e.enrollmentId,
      courseTitle: e.course.title,
      courseSlug: e.course.slug,
      status: e.status,
      progress: e.status === 'completed' ? 100 : 
                e.status === 'active' ? Math.floor(Math.random() * 40) + 40 : // Mock: 40-80%
                e.status === 'confirmed' ? 0 : 0,
      lastAccessed: e.status === 'active' ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
      certificateEligible: e.status === 'completed'
    }));

    return NextResponse.json({
      success: true,
      data: progressSummary
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}