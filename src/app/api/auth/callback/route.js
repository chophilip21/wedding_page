import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  // Get the authorization code from the query string
  const code = new URL(req.url).searchParams.get("code");
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code missing" },
      { status: 400 }
    );
  }

  try {
    // Exchange the authorization code for access and refresh tokens
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri, // Must match the redirect URI used during login
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    // You can store these tokens securely (e.g., in a database or session)
    // For now, we'll just log them and return a success message
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);

    return NextResponse.json({
      message: "Successfully authenticated with Spotify!",
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.error("Error exchanging authorization code for tokens:", error);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
