// app/api/partners/route.ts
import { NextRequest, NextResponse } from 'next/server'; // ✅ NextRequest import
import { sendFormEmails } from '@/lib/email';

export async function POST(request: NextRequest) { // ✅ Parameter type fix
  try {
    const formData = await request.formData();
    
    // ✅ Data extraction with type casting
    const data = {
      type: 'partners' as const,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: (formData.get('company') as string) || 'Not provided',
      subject: (formData.get('subject') as string) || 'Partnership Request',
      message: formData.get('message') as string,
      partnershipType: (formData.get('partnershipType') as string) || '',
      website: (formData.get('website') as string) || ''
    };

    // Basic Validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Emails process karein
    const result = await sendFormEmails('partners', data);

    // ✅ Safe access logic
    if (result && result.success) {
      return NextResponse.json({
        success: true,
        message: 'Partnership request submitted successfully',
        emailsSent: {
          user: result.userEmail?.success ?? false,
          admin: result.adminEmail?.success ?? false
        }
      });
    } else {
      throw new Error('Failed to send emails');
    }

  } catch (error: any) {
    console.error('Partners API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
