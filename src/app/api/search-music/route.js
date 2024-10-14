import { NextResponse } from "next/server";
import { getClientAccessToken } from "@/utils/spotifyClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const token = await getClientAccessToken();
  if (!token) {
    return NextResponse.json(
      { error: "Unable to get access token" },
      { status: 500 }
    );
  }

  try {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=30`;
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error searching tracks:", errorData);
      return NextResponse.json(
        { error: "Failed to search tracks", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return NextResponse.json(
      { error: "Failed to search tracks", details: error.message },
      { status: 500 }
    );
  }
}
