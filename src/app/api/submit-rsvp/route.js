// app/api/submit-rsvp/route.js
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Sheet1';  // default to "Sheet1"

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
