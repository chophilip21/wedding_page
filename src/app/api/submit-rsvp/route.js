// app/api/submit-rsvp/route.js
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_NAME = process.env.GOOGLE_SHEETS_TAB_NAME || 'Sheet1';
const EMAIL_USERNAME = process.env.EMAIL_USERNAME; // e.g. chophilip21@gmail.com
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;

// -------------------------------------------------------------------------
// Define language-specific email templates outside the POST method
const mailTemplates = {
  en: {
    subject: "Wedding RSVP Confirmation",
    html: (firstName, lastName) => `
      <p>Dear ${firstName} ${lastName},</p>
      <p>Thank you for confirming your RSVP. We look forward to celebrating with you!</p>
      <p>Best regards,<br/>Tamako & Philip</p>
    `,
  },
  ko: {
    subject: "웨딩 RSVP 확인",
    html: (firstName, lastName) => `
      <p>안녕하세요 ${firstName} ${lastName}님,</p>
      <p>RSVP를 확인해주셔서 감사합니다. 함께 축하할 날을 기대합니다!</p>
      <p>감사합니다,<br/>타마코 & 필립 (조윤수)</p>
    `,
  },
  ja: {
    subject: "ウェディング RSVP 確認",
    html: (firstName, lastName) => `
      <p>${firstName} ${lastName} 様,</p>
      <p>RSVPをご確認いただきありがとうございます。皆様とお祝いできることを心より楽しみにしております！</p>
      <p>よろしくお願いいたします。<br/>Tamako & Philip</p>
    `,
  },
};

// -------------------------------------------------------------------------
// Helper function to send Telegram notifications
async function sendTelegramNotification({ firstName, lastName, email }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const text = `New Wedding RSVP submission:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    console.error("Telegram notification error", await res.text());
  }
}

// -------------------------------------------------------------------------
// The API route for form submissions
export async function POST(request) {
  try {
    const payload = await request.json();
    console.log("Received payload:", payload);
    const { firstName, lastName, email, language } = payload;

    if (!firstName || !lastName || !email || !language) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Authenticate with Google Sheets API using service account credentials
    const auth = new google.auth.JWT(
      SERVICE_ACCOUNT_EMAIL,
      null,
      SERVICE_ACCOUNT_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    await auth.authorize();
    const sheets = google.sheets({ version: 'v4', auth });

    // 3. Set up nodemailer for sending emails using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    // 4. Fetch the "email" column from Google Sheets for duplicate checking
    const emailRange = `${SHEET_NAME}!C:C`;
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: emailRange,
    });
    const rows = getResponse.data.values || [];
    const emails = rows.slice(1).map(row => (row[0] || '').toLowerCase().trim());

    if (emails.includes(email.toLowerCase().trim())) {
      return NextResponse.json(
        { status: 'duplicate', message: 'This email is already registered.' },
        { status: 409 }
      );
    }

    // 5. Append the new RSVP data as a new row in Google Sheets
    const timestamp = new Date().toISOString();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[firstName, lastName, email, timestamp]],
      },
    });
    console.log('New RSVP data appended to Google Sheets successfully');

    // 6. Send a notification to Telegram
    await sendTelegramNotification({ firstName, lastName, email });
    console.log('Telegram notification sent successfully');

    // 7. Choose the email template based on the submitted language (default to English if not found)
    const template = mailTemplates[language] || mailTemplates['en'];
    const mailOptions = {
      from: EMAIL_USERNAME,
      to: email,
      subject: template.subject,
      html: template.html(firstName, lastName),
    };

    // 8. Send the confirmation email to the user
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (err) {
    console.error('Error in submit-rsvp API:', err);
    return NextResponse.json(
      { status: 'error', message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
