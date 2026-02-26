// app/api/courses/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { courses } from '@/lib/data';

// ✅ Define the Props type for Next.js 15
type Props = {
  params: Promise<{ slug: string }>;
};

// GET: Get course details by slug
export async function GET(
  request: NextRequest,
  { params }: Props // ✅ Updated to use the new Props type
) {
  try {
    // ✅ Next.js 15 requires awaiting params
    const { slug } = await params;

    const course = courses.find(c => c.slug === slug);

    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
