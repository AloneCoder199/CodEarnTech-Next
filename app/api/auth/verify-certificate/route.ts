import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import Course from '@/lib/db/models/Course'; // Ensures course schema mapping
import Enrollment from '@/lib/db/models/Enrollment'; // 🔥 NEW: Imported Enrollment model to cross-verify active records
import { successResponse, errorResponse } from '@/lib/utils/apiResponse';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId || !studentId.startsWith('CET-')) {
      return errorResponse('Valid Student ID is required (e.g., CET-0001)', 400);
    }

    // Explicitly fetching all document attributes from MongoDB
    const user = await User.findOne({ studentId })
      .populate({
        path: 'enrolledCourses',
        model: Course,
        select: 'title icon level duration shortDescription slug',
      })
      .lean();

    if (!user) {
      return errorResponse('Student ID parameter not found within active registries.', 404);
    }

    // 🔥 1. FETCH LIVE ENROLLMENTS: Database query targeted on your custom schema structure
    const liveEnrollments = await Enrollment.find({
      $or: [
        { 'student.email': user.email },
        { 'student.userId': user._id.toString() }
      ],
      status: 'confirmed' // Sirf wahi courses uthayen jo admin verify kar chuka hai
    }).lean();

    // 🔥 2. MAP ENROLLMENT DATA: Extracting fields from your exact nested "course" object
    const coursesFromEnrollments = liveEnrollments.map((enr: any) => {
      if (!enr.course) return null;
      
      const c = enr.course; // Reading the course block from your schema

      return {
        _id: c.courseId || String(enr._id), // If main course ObjectId missing, fallback to enrollment ID
        title: c.title || 'Technical Course',
        slug: c.slug || '',
        level: c.level || 'Intermediate',
        duration: c.duration || 'N/A',
        icon: 'BookOpen', // Default string icon value for frontend component rendering
        shortDescription: `Master ${c.title || 'this track'} step-by-step with industry experts.`
      };
    }).filter(Boolean);

    // 🔥 3. SMART DE-DUPLICATION MERGE: Merging arrays using Javascript Map to avoid repeating courses
    const unifiedCoursesMap = new Map();

    // First layer: Insert already populated courses from User Collection
    if (user.enrolledCourses && Array.isArray(user.enrolledCourses)) {
      user.enrolledCourses.forEach((c: any) => {
        const identifier = c.slug || String(c._id);
        if (identifier) unifiedCoursesMap.set(identifier, c);
      });
    }

    // Second layer: Append courses found in Enrollment Table if not already existing
    coursesFromEnrollments.forEach((c: any) => {
      const identifier = c.slug || String(c._id);
      if (identifier && !unifiedCoursesMap.has(identifier)) {
        unifiedCoursesMap.set(identifier, c);
      }
    });

    // Converting map into clean final array
    const absoluteEnrolledCourses = Array.from(unifiedCoursesMap.values());

    // 🔥 PERFECT ALIGNMENT: Mapping both Raw fields & Frontend structural keys
    const comprehensivePayload = {
      // 1. Raw MongoDB Structure Fields
      _id: user._id.toString(),
      email: user.email,
      role: user.role,
      studentId: user.studentId,
      profile: {
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        avatar: user.profile?.avatar || '',
        phone: user.profile?.phone || 'N/A',
      },
      isEmailVerified: user.isEmailVerified ?? false,
      verificationToken: user.verificationToken || 'N/A',
      verificationTokenExpires: user.verificationTokenExpires || null,
      enrolledCourses: absoluteEnrolledCourses, // 🔥 UPDATED: Blended secure data structure
      loginAttempts: user.loginAttempts ?? 0,
      violationCount: user.violationCount ?? 0,
      isBanned: user.isBanned ?? false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v ?? 0,

      // 2. 🔥 FRONTEND EXACT MATCHING KEYS (Yeh lagana lazmi tha taake data show ho)
      fullName: `${user.profile?.firstName || ''} ${user.profile?.lastName || ''}`.trim() || 'CodEarn Student',
      isVerified: user.isEmailVerified ?? false, 
      joinedDate: user.createdAt,
      courses: absoluteEnrolledCourses // 🔥 UPDATED: Injected consolidated list directly for dashboard .map UI loops
    };

    return successResponse(
      comprehensivePayload,
      'Complete tracking matrix with consolidated live schema enrollments retrieved successfully.',
      200
    );

  } catch (error: any) {
    console.error('Administrative matrix verification crash:', error);
    return errorResponse('Internal server engine pipeline error.', 500);
  }
}