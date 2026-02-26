// app/api/admin/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Enrollment from '@/lib/db/models/Enrollment';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Overall stats
    const totalStats = await Enrollment.aggregate([
      {
        $group: {
          _id: null,
          totalEnrollments: { $sum: 1 },
          totalRevenue: { $sum: '$payment.amount' },
          verifiedRevenue: {
            $sum: {
              $cond: [{ $eq: ['$payment.status', 'verified'] }, '$payment.amount', 0]
            }
          },
          pendingRevenue: {
            $sum: {
              $cond: [{ $eq: ['$payment.status', 'pending'] }, '$payment.amount', 0]
            }
          }
        }
      }
    ]);

    // Status breakdown
    const statusStats = await Enrollment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Payment status breakdown
    const paymentStats = await Enrollment.aggregate([
      {
        $group: {
          _id: '$payment.status',
          count: { $sum: 1 },
          amount: { $sum: '$payment.amount' }
        }
      }
    ]);

    // Course popularity
    const courseStats = await Enrollment.aggregate([
      {
        $group: {
          _id: '$course.title',
          enrollments: { $sum: 1 },
          revenue: { $sum: '$payment.amount' }
        }
      },
      { $sort: { enrollments: -1 } },
      { $limit: 5 }
    ]);

    // Monthly trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrend = await Enrollment.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$payment.amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Recent pending enrollments
    const recentPending = await Enrollment.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        overview: totalStats[0] || {
          totalEnrollments: 0,
          totalRevenue: 0,
          verifiedRevenue: 0,
          pendingRevenue: 0
        },
        statusBreakdown: statusStats,
        paymentStats,
        topCourses: courseStats,
        monthlyTrend,
        recentPending
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


