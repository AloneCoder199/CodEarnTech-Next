import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Subscriber from '@/lib/db/models/subscriber';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe link' },
        { status: 400 }
      );
    }

    await connectDB();

    const subscriber = await Subscriber.findOne({ token });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe link' },
        { status: 404 }
      );
    }

    if (!subscriber.isActive) {
      return NextResponse.json(
        { message: 'You are already unsubscribed' },
        { status: 200 }
      );
    }

    // Soft delete
    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return NextResponse.json(
      { message: 'Unsubscribed successfully. You will no longer receive emails.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}