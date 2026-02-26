import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Session from '@/lib/db/models/Session';
import { verifyAccessToken } from '@/lib/utils/jwt';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = verifyAccessToken(token);
    await connectDB();

    // Sirf valid aur non-expired sessions nikalain
    const sessions = await Session.find({
      userId: payload.userId,
      isValid: true,
      expiresAt: { $gt: new Date() }
    }).sort({ lastActive: -1 });

    return NextResponse.json({ success: true, data: sessions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

// Remote Logout (Delete specific session)
export async function DELETE(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    await connectDB();
    
    await Session.updateOne({ refreshToken: sessionId }, { $set: { isValid: false } });
    
    return NextResponse.json({ success: true, message: 'Device logged out' });
  } catch (error) {
    return NextResponse.json({ error: 'Action failed' }, { status: 500 });
  }
}
