import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, collegeId } = await req.json();

    if (!email || !collegeId) {
      return NextResponse.json(
        { error: 'Email and college ID are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create notification subscription
    // For now, just log it (in production, you'd save this to database)
    console.log(`📧 Email notification subscribed: ${email} for college ${collegeId}`);

    return NextResponse.json({
      success: true,
      message: `Subscription confirmed for ${email}. You'll receive updates about this college!`,
    });
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to notifications' },
      { status: 500 }
    );
  }
}
