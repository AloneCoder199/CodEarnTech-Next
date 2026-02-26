// app/api/admin/enrollments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';
import { sendEmail, generateEnrollmentConfirmationEmail, generatePaymentRejectionEmail } from '@/lib/email';

type RouteContext = {
  params: Promise<{ id: string }>; // Next.js 15+ requirement
};

// PATCH: Update enrollment (verify/reject)
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params; // Unwrapping the promise
    await connectDB();

    const body = await request.json();
    const { action, adminId, adminName, notes } = body;

    if (!['verify', 'reject', 'cancel'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Invalid action' },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: 'Enrollment not found' },
        { status: 404 }
      );
    }

    const updateData: any = {};
    let emailResult;

    switch (action) {
      case 'verify':
        updateData.status = 'confirmed';
        updateData['payment.status'] = 'verified';
        updateData['payment.verifiedAt'] = new Date();
        updateData['payment.verifiedBy'] = adminName || adminId;
        
        await Enrollment.findByIdAndUpdate(id, { $set: updateData });
        
        // Send confirmation email
        emailResult = await sendEmail({
          to: enrollment.student.email,
          subject: `✅ Enrollment Confirmed - ${enrollment.enrollmentId}`,
          html: generateEnrollmentConfirmationEmail(enrollment),
        });
        break;

      case 'reject':
        updateData.status = 'cancelled';
        updateData['payment.status'] = 'rejected';
        updateData.notes = notes || 'Payment verification failed';
        
        await Enrollment.findByIdAndUpdate(id, { $set: updateData });
        
        // Send rejection email
        emailResult = await sendEmail({
          to: enrollment.student.email,
          subject: `❌ Enrollment Update - ${enrollment.enrollmentId}`,
          html: generatePaymentRejectionEmail({
  name: enrollment.student.name,
  courseName: enrollment.course.title, // Ensure karein ke title field sahi hai
  reason: notes // 'notes' ko 'reason' ke taur par pass karein
}),
        });
        break;

      case 'cancel':
        updateData.status = 'cancelled';
        await Enrollment.findByIdAndUpdate(id, { $set: updateData });
        break;
    }

    return NextResponse.json({
      success: true,
      message: `Enrollment ${action}ed successfully`,
      emailSent: emailResult?.success || false
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET: Single enrollment details
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params; // Unwrapping the promise
    await connectDB();

    const enrollment = await Enrollment.findById(id).lean();

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: 'Enrollment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: enrollment
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
