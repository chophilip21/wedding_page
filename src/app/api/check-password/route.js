import { NextResponse } from "next/server";

// Retrieve the password from environment variables
const correctPassword = process.env.GUEST_ACCESS_PASSWORD;

export async function POST(request) {
  try {
    const body = await request.json(); // Get the request body (which contains the password)
    const { password } = body;

    // Check if the password matches the one in the environment variable
    if (password === correctPassword) {
      return NextResponse.json({
        success: true,
        message: "Password is correct",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error processing request",
      error,
    });
  }
}
