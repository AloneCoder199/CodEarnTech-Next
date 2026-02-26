// app/api/enrollments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';
import { sendEmail, generateStudentEnrollmentEmail } from '@/lib/email';

// ✅ Define Props Type for Next.js 15 Compatibility
type Props = {
  params: Promise<{ id: string }>;
};

// GET: Single enrollment details
export async function GET(
  request: NextRequest,
  { params }: Props // ✅ Updated Type to Promise
) {
  try {
    await connectDB();
    
    // ✅ Must await params in Next.js 15
    const { id } = await params;

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
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH: Update enrollment status (Admin only)
export async function PATCH(
  request: NextRequest,
  { params }: Props // ✅ Updated Type to Promise
) {
  try {
    await connectDB();
    
    // ✅ Must await params in Next.js 15
    const { id } = await params;

    const body = await request.json();
    const { status, verifiedBy, notes } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status is required' },
        { status: 400 }
      );
    }

    const updateData: any = { status };

    // If verifying payment
    if (status === 'confirmed') {
      updateData['payment.status'] = 'verified';
      updateData['payment.verifiedAt'] = new Date();
      updateData['payment.verifiedBy'] = verifiedBy;
    }

    if (notes) updateData.notes = notes;

    const enrollment = await Enrollment.findByIdAndUpdate(
      id, // ✅ Using 'id' from awaited params
      { $set: updateData },
      { new: true }
    );

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: 'Enrollment not found' },
        { status: 404 }
      );
    }

    // Send confirmation email if status changed to confirmed
    if (status === 'confirmed') {
      await sendEmail({
        to: enrollment.student.email,
        subject: `✅ Enrollment Confirmed - ${enrollment.enrollmentId}`,
        html: generateStudentEnrollmentEmail(enrollment),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Enrollment updated successfully',
      data: enrollment
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
