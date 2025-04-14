// app/api/submit-rsvp/route.js
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_NAME = process.env.GOOGLE_SHEETS_TAB_NAME || 'Sheet1';  // default to "Sheet1"
const EMAIL_USERNAME = process.env.EMAIL_USERNAME; // The email address to send notifications from
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD; // The app password for the email account

// Only handle POST requests (Next.js will automatically handle other methods if not defined)
export async function POST(request) {
  try {
    // 1. Parse request body
    const { firstName, lastName, email } = await request.json();
    if (!firstName || !lastName || !email) {
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
      ['https://www.googleapis.com/auth/spreadsheets']  // full access to Google Sheets
    );
    // Ensure the client is authorized (not always necessary to call explicitly)
    await auth.authorize();
    const sheets = google.sheets({ version: 'v4', auth });


    // 2.1 Set up nodemailer for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // Preferably, store these credentials in .env.local
        user: EMAIL_USERNAME,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME || 'chophilip21@gmail.com', // must be the same as your verified sender email
      to: email,
      subject: 'Wedding RSVP Confirmation',
      html: `<p>Dear ${firstName} ${lastName},</p>
             <p>Thank you for confirming your RSVP. We look forward to celebrating with you!</p>
             <p>Best regards,<br/>Tamako & Philip</p>`,
    };

    // 3. Fetch the "email" column from the sheet to check for duplicates
    const emailRange = `${SHEET_NAME}!C:C`;  // Column C is "email"
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: emailRange,
    });
    const rows = getResponse.data.values || [];
    // If there's a header row, remove it before checking
    const emails = rows.slice(1).map(row => (row[0] || '').toLowerCase().trim());

    // 4. Check if the submitted email already exists (case-insensitive)
    if (emails.includes(email.toLowerCase().trim())) {
      return NextResponse.json(
        { status: 'duplicate', message: 'This email is already registered.' },
        { status: 409 }
      );
    }

    // 5. Append the new RSVP data as a new row in the spreadsheet
    const timestamp = new Date().toISOString();  // current UTC time
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`,  // Columns: first-name, last-name, email, timestamp
      valueInputOption: 'RAW',     // input values as-is (no formula parsing)
      requestBody: {
        values: [[firstName, lastName, email, timestamp]],
      },
    });
    console.log('New RSVP data appended to Google Sheets successfully');

    // 5.1 Send a notification to Telegram
    await sendTelegramNotification({ firstName, lastName, email});
    console.log('Telegram notification sent successfully');

    // 5.2 Send a confirmation email to the user
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');
    
    // 6. Return a success response
    return NextResponse.json(
      { status: 'success' },
      { status: 200 }
    );

  } catch (err) {
    console.error('Error in submit-rsvp API:', err);
    return NextResponse.json(
      { status: 'error', message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

async function sendTelegramNotification({ firstName, lastName, email }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const text = `New Wedding RSVP submission:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });

  if (!res.ok) {
    // Log the error response in your server log for troubleshooting.
    console.error("Telegram notification error", await res.text());
  }
}