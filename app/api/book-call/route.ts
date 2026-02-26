// app/api/book-call/route.js
"use server"

import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

// User Confirmation Email Template
function generateUserBookingConfirmation(data:any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .badge { display: inline-block; padding: 5px 15px; background: #3b82f6; color: white; border-radius: 20px; font-size: 12px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
        .calendar-buttons { text-align: center; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Booking Confirmed!</h1>
          <p>Your call is scheduled, ${data.name}</p>
        </div>
        <div class="content">
          <p>Hi <strong>${data.name}</strong>,</p>
          <p>Your call with CodEarnTech has been successfully booked. We're excited to speak with you!</p>
          
          <div class="details">
            <h3>📅 Booking Details</h3>
            <div class="detail-row">
              <strong>Booking ID:</strong> #BK-${Date.now().toString(36).toUpperCase()}
            </div>
            <div class="detail-row">
              <strong>Call Type:</strong> <span class="badge">${data.callType}</span>
            </div>
            <div class="detail-row">
              <strong>Duration:</strong> ${data.duration}
            </div>
            <div class="detail-row">
              <strong>Date:</strong> ${data.date}
            </div>
            <div class="detail-row">
              <strong>Time:</strong> ${data.time}
            </div>
            <div class="detail-row">
              <strong>Host:</strong> ${data.hostName} (${data.hostRole})
            </div>
          </div>

          <div class="details">
            <h3>👤 Your Information</h3>
            <div class="detail-row"><strong>Name:</strong> ${data.name}</div>
            <div class="detail-row"><strong>Email:</strong> ${data.email}</div>
            <div class="detail-row"><strong>Company:</strong> ${data.company}</div>
            ${data.phone ? `<div class="detail-row"><strong>Phone:</strong> ${data.phone}</div>` : ''}
          </div>

          <div class="details">
            <h3>📝 Discussion Topics</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 5px; font-style: italic;">
              "${data.notes}"
            </p>
          </div>

          <div class="calendar-buttons">
            <p style="margin-bottom: 10px;"><strong>Add to your calendar:</strong></p>
            <a href="#" class="button">Google Calendar</a>
            <a href="#" class="button">Outlook</a>
            <a href="#" class="button">Apple Calendar</a>
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>📧 What's Next?</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>You'll receive a Google Meet link 15 minutes before the call</li>
              <li>A reminder email 24 hours before your scheduled time</li>
              <li>Please join 2-3 minutes early</li>
            </ul>
          </div>

          <p style="margin-top: 20px;">Need to reschedule? Reply to this email or contact us at <a href="mailto:support@CodEarnTech.com">support@CodEarnTech.com</a></p>
        </div>
        <div class="footer">
          <p>© 2024 CodEarnTech. All rights reserved.</p>
          <p>CodEarnTech, 123 Innovation Drive, Tech City, TC 12345</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Admin Notification Email Template
function generateAdminBookingNotification(data:any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .alert { background: #ede9fe; border-left: 4px solid #7c3aed; padding: 15px; margin: 20px 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .button { display: inline-block; padding: 12px 30px; background: #7c3aed; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .priority-high { color: #dc2626; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📞 New Call Booking!</h1>
          <p>Action Required - Confirm Attendance</p>
        </div>
        <div class="content">
          <div class="alert">
            <strong>New Booking Alert:</strong> A ${data.callType} has been scheduled for ${data.date} at ${data.time}
          </div>
          
          <div class="details">
            <h3>👤 Prospect Information</h3>
            <div class="detail-row"><strong>Name:</strong> ${data.name}</div>
            <div class="detail-row"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></div>
            <div class="detail-row"><strong>Company:</strong> ${data.company}</div>
            ${data.phone ? `<div class="detail-row"><strong>Phone:</strong> ${data.phone}</div>` : ''}
            ${data.guests ? `<div class="detail-row"><strong>Additional Guests:</strong> ${data.guests}</div>` : ''}
          </div>

          <div class="details">
            <h3>📅 Booking Details</h3>
            <div class="detail-row"><strong>Booking ID:</strong> #BK-${Date.now().toString(36).toUpperCase()}</div>
            <div class="detail-row"><strong>Call Type:</strong> ${data.callType}</div>
            <div class="detail-row"><strong>Duration:</strong> ${data.duration}</div>
            <div class="detail-row"><strong>Date:</strong> ${data.date}</div>
            <div class="detail-row"><strong>Time:</strong> ${data.time}</div>
            <div class="detail-row"><strong>Assigned Host:</strong> ${data.hostName} (${data.hostRole})</div>
          </div>

          <div class="details">
            <h3>📝 Discussion Topics</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 5px;">
              ${data.notes}
            </p>
          </div>

          <div class="details">
            <h3>⏰ Timeline</h3>
            <div class="detail-row"><strong>Booked At:</strong> ${new Date().toLocaleString()}</div>
            <div class="detail-row"><strong>Scheduled For:</strong> ${data.date} at ${data.time}</div>
          </div>

          <center>
            <a href="mailto:${data.email}?subject=Re: Your ${data.callType} Booking" class="button">
              Contact Prospect
            </a>
          </center>

          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            <strong>Next Steps:</strong>
            <ol style="margin: 10px 0; padding-left: 20px;">
              <li>Confirm your availability</li>
              <li>Prepare agenda based on discussion topics</li>
              <li>Send Google Meet link 15 mins before call</li>
              <li>Update CRM with booking details</li>
            </ol>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request:any) {
  try {
    const data = await request.json();

    // Validation
    if (!data.name || !data.email || !data.company || !data.callType || !data.date || !data.time) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@CodEarnTech.com';

    // Send emails
    const [userResult, adminResult] = await Promise.all([
      // User confirmation
      sendEmail({
        to: data.email,
        subject: `✅ Your ${data.callType} is Confirmed - CodEarnTech`,
        html: generateUserBookingConfirmation(data)
      }),
      // Admin notification
      sendEmail({
        to: adminEmail,
        subject: `📞 New Booking: ${data.callType} with ${data.name} - ${data.date}`,
        html: generateAdminBookingNotification(data)
      })
    ]);

    if (userResult.success && adminResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Booking confirmed successfully',
        bookingId: `BK-${Date.now().toString(36).toUpperCase()}`,
        emailsSent: {
          user: true,
          admin: true
        }
      });
    } else {
      throw new Error('Failed to send confirmation emails');
    }

  } catch (error) {
    console.error('Book Call API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}