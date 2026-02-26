// app/api/enrollments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';
import { uploadImage } from '@/lib/cloudinary';
import { sendEmail, generateStudentEnrollmentEmail, generateAdminNotificationEmail } from '@/lib/email';

// POST: Create new enrollment
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    
    // Extract files
    const receiptFile = formData.get('receipt') as File;
    
    if (!receiptFile) {
      return NextResponse.json(
        { success: false, message: 'Payment receipt is required' },
        { status: 400 }
      );
    }

    // Convert file to base64 for Cloudinary
    const bytes = await receiptFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${receiptFile.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResult = await uploadImage(base64File, 'enrollments/receipts');
    
    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to upload receipt' },
        { status: 500 }
      );
    }

    // Extract form data
    const enrollmentData = {
      student: {
        userId: formData.get('userId') as string || undefined,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        cnic: formData.get('cnic') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        education: formData.get('education') as string,
        experience: formData.get('experience') as string,
      },
      course: {
        courseId: formData.get('courseId') as string,
        title: formData.get('courseTitle') as string,
        slug: formData.get('courseSlug') as string,
        level: formData.get('courseLevel') as string,
        duration: formData.get('courseDuration') as string,
        price: parseInt(formData.get('coursePrice') as string),
        discountPrice: formData.get('courseDiscountPrice') 
          ? parseInt(formData.get('courseDiscountPrice') as string)
          : undefined,
      },
      payment: {
        method: formData.get('paymentMethod') as string,
        amount: parseInt(formData.get('paymentAmount') as string),
        transactionId: formData.get('transactionId') as string,
        receiptUrl: uploadResult.url,
        paidAt: new Date(),
      },
      preferredBatch: formData.get('preferredBatch') as string,
      message: formData.get('message') as string || undefined,
    };

    // Validate required fields
    const requiredFields = [
      'student.firstName', 'student.lastName', 'student.email', 'student.phone',
      'student.cnic', 'student.address', 'student.city', 'student.education',
      'course.courseId', 'course.title', 'payment.transactionId'
    ];

    for (const field of requiredFields) {
      const value = field.split('.').reduce((obj, key) => obj?.[key], enrollmentData as any);
      if (!value) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if enrollment already exists for this email + course
    const existingEnrollment = await Enrollment.findOne({
      'student.email': enrollmentData.student.email,
      'course.courseId': enrollmentData.course.courseId,
      status: { $nin: ['cancelled'] }
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, message: 'You are already enrolled in this course' },
        { status: 409 }
      );
    }

    // Create enrollment
    const enrollment = await Enrollment.create(enrollmentData);

    // Send emails
    const [studentEmailResult, adminEmailResult] = await Promise.all([
      // Email to student
      sendEmail({
        to: enrollment.student.email,
        subject: `🎉 Enrollment Received - ${enrollment.enrollmentId}`,
        html: generateStudentEnrollmentEmail(enrollment),
      }),
      // Email to admin
      sendEmail({
        to: process.env.ADMIN_EMAIL!,
        subject: `🚨 New Enrollment - ${enrollment.enrollmentId}`,
        html: generateAdminNotificationEmail(enrollment),
      })
    ]);

    // Update notification status
    await Enrollment.findByIdAndUpdate(enrollment._id, {
      $set: {
        'notificationsSent.studentEmail': studentEmailResult.success,
        'notificationsSent.adminEmail': adminEmailResult.success,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Enrollment created successfully',
      data: {
        enrollmentId: enrollment.enrollmentId,
        id: enrollment._id,
        studentEmailSent: studentEmailResult.success,
        adminEmailSent: adminEmailResult.success,
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Enrollment creation error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET: Get all enrollments (Admin only - add auth middleware)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const courseSlug = searchParams.get('course');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (courseSlug) query['course.slug'] = courseSlug;

    const skip = (page - 1) * limit;

    const [enrollments, total] = await Promise.all([
      Enrollment.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enrollment.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: enrollments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Fetch enrollments error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}