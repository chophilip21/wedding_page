import { getSpotifyAccessToken } from "@/utils/spotify";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
    });
  }

  const token = await getSpotifyAccessToken();
  if (!token) {
    return new Response(
      JSON.stringify({ error: "Unable to get access token" }),
      { status: 500 }
    );
  }

  try {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=12`;
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return new Response(JSON.stringify({ error: "Failed to search tracks" }), {
      status: 500,
    });
  }
}
