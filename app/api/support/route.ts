// app/api/support/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendFormEmails } from '@/lib/email';

export async function POST(request: NextRequest) { // ✅ Request type fix
  try {
    const formData = await request.formData();
    
    const data = {
      type: 'support',
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: (formData.get('company') as string) || 'Not provided',
      subject: (formData.get('subject') as string) || 'No subject',
      message: formData.get('message') as string,
      priority: (formData.get('priority') as string) || 'normal',
      responseTime: '2 hours'
    };

    // Validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Emails bhejo
    const result = await sendFormEmails('support', data);

    // ✅ Safe Access: Check if result and its properties exist
    if (result && result.success) {
      return NextResponse.json({
        success: true,
        message: 'Support request submitted successfully',
        emailsSent: {
          // Optional chaining (?.) use kiya taake 'undefined' error na aaye
          user: result.userEmail?.success || false,
          admin: result.adminEmail?.success || false
        }
      });
    } else {
      throw new Error('Failed to send emails');
    }

  } catch (error: any) {
    console.error('Support API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
