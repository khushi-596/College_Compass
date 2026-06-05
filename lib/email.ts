import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Use Resend for production, Nodemailer for development
const useResend = process.env.RESEND_API_KEY && process.env.NODE_ENV === 'production';

let transporter: any = null;

if (!useResend && process.env.NODE_ENV === 'development') {
  // Development: Use test email service
  transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false,
  });
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    if (useResend) {
      // Production: Use Resend
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const response = await resend.emails.send({
        from: process.env.SENDER_EMAIL || 'noreply@collegecompass.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      if (response.error) {
        return { success: false, error: response.error.message };
      }

      return { success: true };
    } else {
      // Development: Use Nodemailer (local test)
      if (!transporter) {
        // Fallback: just log in development
        console.log('📧 Email would be sent:', {
          to: options.to,
          subject: options.subject,
        });
        return { success: true };
      }

      await transporter.sendMail({
        from: process.env.SENDER_EMAIL || 'noreply@collegecompass.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      return { success: true };
    }
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function getCollegeComparisonEmail(
  userEmail: string,
  colleges: any[],
  comparisonsUrl: string
): EmailOptions {
  const collegesList = colleges
    .map(
      (college) =>
        `<li><strong>${college.name}</strong> - ${college.location} | Rating: ${college.rating}/10</li>`
    )
    .join('');

  return {
    to: userEmail,
    subject: `Your College Comparison Results - College Compass`,
    html: `
      <h2>Your College Comparison</h2>
      <p>Here are the colleges you compared:</p>
      <ul>
        ${collegesList}
      </ul>
      <p><a href="${comparisonsUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Full Comparison</a></p>
      <hr>
      <p style="color: #666; font-size: 12px;">College Compass - Your guide to finding the perfect college</p>
    `,
  };
}

export function getWelcomeEmail(userName: string): EmailOptions {
  return {
    to: userName,
    subject: `Welcome to College Compass!`,
    html: `
      <h2>Welcome to College Compass!</h2>
      <p>Thank you for joining our platform. We're excited to help you find the perfect college.</p>
      <h3>What you can do:</h3>
      <ul>
        <li>Search from 1000+ colleges across India</li>
        <li>Filter by location, fees, ratings, and more</li>
        <li>Compare up to 3 colleges side-by-side</li>
        <li>Get personalized recommendations</li>
      </ul>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://collegecompass.com'}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Start Exploring</a></p>
      <hr>
      <p style="color: #666; font-size: 12px;">College Compass - Your guide to finding the perfect college</p>
    `,
  };
}

export function getComparisonReminder(userName: string, colleges: any[]): EmailOptions {
  const collegeName = colleges[0]?.name || 'your college';
  
  return {
    to: userName,
    subject: `Don't forget: Compare ${collegeName} with other options`,
    html: `
      <h2>Complete Your Comparison!</h2>
      <p>Hi,</p>
      <p>You were interested in <strong>${collegeName}</strong>. Don't forget to compare it with other similar colleges to make the best decision.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://collegecompass.com'}/compare" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Comparison Tool</a></p>
      <hr>
      <p style="color: #666; font-size: 12px;">College Compass - Your guide to finding the perfect college</p>
    `,
  };
}
