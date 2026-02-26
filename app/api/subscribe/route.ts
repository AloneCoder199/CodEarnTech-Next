import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Subscriber from '@/lib/db/models/subscriber';
import { sendEmail, getWelcomeEmailTemplate } from '@/lib/email';
import crypto from 'crypto';

// Rate limiting (simple in-memory, use Redis in production)
const rateLimit = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 60 * 60 * 1000; // 1 hour window
  const requests = rateLimit.get(ip) || [];
  
  // Filter requests within window
  const recentRequests = requests.filter(time => time > windowStart);
  
  if (recentRequests.length >= 5) {
    return false; // Rate limited
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // ✅ Fix: Get IP from headers (Standard way in Next.js App Router)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';
    
    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { email } = await request.json();
    
    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const emailLower = email.toLowerCase();
    const existingSubscriber = await Subscriber.findOne({ email: emailLower });
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        );
      } else {
        existingSubscriber.isActive = true;
        existingSubscriber.unsubscribedAt = null;
        existingSubscriber.token = crypto.randomBytes(32).toString('hex');
        await existingSubscriber.save();
        
        await sendEmail({
          to: emailLower,
          subject: 'Welcome Back! Subscription Reactivated',
          html: getWelcomeEmailTemplate(emailLower, existingSubscriber.token),
        });
        
        return NextResponse.json(
          { message: 'Subscription reactivated successfully!' },
          { status: 200 }
        );
      }
    }

    const token = crypto.randomBytes(32).toString('hex');
    const subscriber = new Subscriber({
      email: emailLower,
      token,
      isActive: true,
    });
    
    await subscriber.save();

    await sendEmail({
      to: emailLower,
      subject: 'Welcome to Our Newsletter!',
      html: getWelcomeEmailTemplate(emailLower, token),
    });

    return NextResponse.json(
      { message: 'Subscribed successfully! Check your email.' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
