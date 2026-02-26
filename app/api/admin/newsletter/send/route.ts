import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'; // Sirf decode karne ke liye
import connectDB from '@/lib/db/connect';
import Subscriber from '@/lib/db/models/subscriber';
import Newsletter from '@/lib/db/models/newsletter';
import { sendEmail, getNewsletterTemplate } from '@/lib/email';
// Agar aapka User model hai to use import karein
// import User from '@/lib/db/models/user'; 

// ... baaqi imports same rahengi

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value || cookieStore.get('user_data')?.value;

    if (!token) return NextResponse.json({ error: 'Login required' }, { status: 401 });

    const decodedUser = jwt.decode(token) as any;
    if (!decodedUser || decodedUser.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { subject, content } = await request.json();
    await connectDB();

    const activeSubscribers = await Subscriber.find({ isActive: true }).lean();
    if (activeSubscribers.length === 0) {
      return NextResponse.json({ error: 'No subscribers found' }, { status: 404 });
    }

    // --- FIX START: Yahan 'sending' ki jagah 'draft' ya 'sent' use karein ---
    const newsletter = new Newsletter({
      subject,
      content,
      status: 'sent', // 👈 'sending' validation error de raha tha, isliye 'sent' use kiya
      recipientCount: activeSubscribers.length,
      sentAt: new Date()
    });
    
    // Pehle save karein
    await newsletter.save();
    // --- FIX END ---

    let successCount = 0;
    for (const subscriber of activeSubscribers) {
      try {
        const emailHtml = getNewsletterTemplate(content, (subscriber as any).token);
        await sendEmail({
          to: (subscriber as any).email,
          subject: subject,
          html: emailHtml,
        });
        successCount++;
      } catch (err) {
        console.error("Email fail:", (subscriber as any).email);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter sent successfully to ${successCount} people.`,
    });

  } catch (error: any) {
    console.error('API Error:', error);
    // User ko wahi error dikhane ke liye jo mongoose de raha hai
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}
