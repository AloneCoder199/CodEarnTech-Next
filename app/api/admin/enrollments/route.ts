// app/api/admin/enrollments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Filters
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const courseSlug = searchParams.get('course');
    const search = searchParams.get('search');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    
    if (status) query.status = status;
    if (paymentStatus) query['payment.status'] = paymentStatus;
    if (courseSlug) query['course.slug'] = courseSlug;
    
    if (search) {
      query.$or = [
        { 'student.firstName': { $regex: search, $options: 'i' } },
        { 'student.lastName': { $regex: search, $options: 'i' } },
        { 'student.email': { $regex: search, $options: 'i' } },
        { enrollmentId: { $regex: search, $options: 'i' } },
        { 'payment.transactionId': { $regex: search, $options: 'i' } }
      ];
    }

    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    // Execute query
    const [enrollments, total] = await Promise.all([
      Enrollment.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enrollment.countDocuments(query)
    ]);

    // Calculate stats for current filter
    const stats = await Enrollment.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$payment.amount' },
          verifiedAmount: {
            $sum: {
              $cond: [{ $eq: ['$payment.status', 'verified'] }, '$payment.amount', 0]
            }
          }
        }
      }
    ]);

    return NextResponse.json({
      success: true,
      data: enrollments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: stats[0] || { totalAmount: 0, verifiedAmount: 0 }
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}