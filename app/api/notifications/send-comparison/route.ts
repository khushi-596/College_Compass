import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getCollegeComparisonEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email, colleges } = await req.json();

    if (!email || !colleges || colleges.length === 0) {
      return NextResponse.json(
        { error: 'Email and colleges array are required' },
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

    // Build comparison URL
    const collegeIds = colleges.map((c: any) => c.id).join(',');
    const comparisonsUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/compare?colleges=${collegeIds}`;

    // Send email
    const emailOptions = getCollegeComparisonEmail(email, colleges, comparisonsUrl);
    const result = await sendEmail(emailOptions);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Comparison results sent to ${email}`,
    });
  } catch (error) {
    console.error('Error sending comparison email:', error);
    return NextResponse.json(
      { error: 'Failed to send comparison email' },
      { status: 500 }
    );
  }
}
