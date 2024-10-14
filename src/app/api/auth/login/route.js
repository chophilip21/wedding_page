export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // e.g. http://localhost:3000/api/auth/callback
  const scope = "playlist-modify-public playlist-modify-private";

  // Generate the Spotify authorization URL
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}`;

  return new Response(JSON.stringify({ loginUrl }), {
    headers: { "Content-Type": "application/json" },
  });
}
