import { NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";

// Function to get Spotify Access Token
async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const data = qs.stringify({ grant_type: "client_credentials" });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
  };

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    return response.data.access_token; // Return the access token
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    return null;
  }
}

// API Route to Add a Track to the Playlist
export async function POST(req) {
  const { trackUri } = await req.json(); // Get the track URI from the request body
  const playlistId = process.env.SPOTIFY_PLAYLIST_ID; // Get the playlist ID from environment

  const token = await getSpotifyAccessToken(); // Fetch access token
  if (!token) {
    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [trackUri], // URI of the track to add
        }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ message: "Track added successfully!" });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to add track", details: errorData },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding track to playlist", details: error.message },
      { status: 500 }
    );
  }
}
