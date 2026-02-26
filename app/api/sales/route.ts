// app/api/sales/route.ts
import { NextRequest, NextResponse } from 'next/server'; // ✅ NextRequest import kiya
import { sendFormEmails } from '@/lib/email';

export async function POST(request: NextRequest) { // ✅ Parameter type fix
  try {
    const formData = await request.formData();
    
    // ✅ Form data se values nikaalne ka safe tareeqa
    const data = {
      type: 'sales' as const,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: (formData.get('company') as string) || 'Not provided',
      subject: (formData.get('subject') as string) || 'Sales Inquiry',
      message: formData.get('message') as string,
      budget: (formData.get('budget') as string) || '',
      timeline: (formData.get('timeline') as string) || ''
    };

    // Basic Validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Emails process karein
    const result = await sendFormEmails('sales', data);

    // ✅ Safe access using ?. taake 'undefined' error na aaye
    if (result && result.success) {
      return NextResponse.json({
        success: true,
        message: 'Sales inquiry submitted successfully',
        emailsSent: {
          user: result.userEmail?.success ?? false,
          admin: result.adminEmail?.success ?? false
        }
      });
    } else {
      throw new Error('Failed to send emails');
    }

  } catch (error: any) {
    console.error('Sales API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
