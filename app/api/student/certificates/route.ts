// app/api/student/certificates/route.ts
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

    // Get completed courses with certificates
    const completedEnrollments = await Enrollment.find({
      'student.email': email,
      status: 'completed'
    })
    .sort({ updatedAt: -1 })
    .lean();

    const certificates = completedEnrollments.map(e => ({
      id: e._id,
      enrollmentId: e.enrollmentId,
      courseTitle: e.course.title,
      courseLevel: e.course.level,
      issueDate: e.updatedAt,
      certificateNumber: `CERT-${e.enrollmentId}`,
      verificationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify/${e.enrollmentId}`,
      downloadUrl: `/api/student/certificates/${e._id}/download`,
      skills: e.course.tags || [],
      duration: e.course.duration,
      completionDate: new Date(e.updatedAt).toLocaleDateString()
    }));

    // Stats
    const stats = {
      totalCertificates: certificates.length,
      totalSkillsLearned: [...new Set(certificates.flatMap(c => c.skills))].length,
      hoursInvested: completedEnrollments.reduce((acc, curr) => acc + (parseInt(curr.course.duration) || 0), 0)
    };

    return NextResponse.json({
      success: true,
      data: { certificates, stats }
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}