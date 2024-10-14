// import { NextResponse } from "next/server";
// import { refreshSpotifyAccessToken } from "@/utils/spotify";

// export async function POST(req) {
//   const { trackUri } = await req.json();
//   let accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

//   // If the access token is not present or expired, refresh it
//   if (!accessToken) {
//     accessToken = await refreshSpotifyAccessToken();
//   }

//   try {
//     const response = await fetch(
//       `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           uris: [trackUri],
//         }),
//       }
//     );

//     if (response.ok) {
//       return NextResponse.json({ message: "Track added successfully!" });
//     } else {
//       const errorData = await response.json();
//       return NextResponse.json(
//         { error: "Failed to add track", details: errorData },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Error adding track to playlist", details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getValidUserAccessToken } from "@/utils/spotifyUser";

export async function POST(req) {
  try {
    const { trackUri } = await req.json();
    if (!trackUri) {
      return NextResponse.json(
        { error: "trackUri is required" },
        { status: 400 }
      );
    }

    const accessToken = await getValidUserAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: "Unable to obtain Spotify access token" },
        { status: 500 }
      );
    }

    const playlistId = process.env.SPOTIFY_PLAYLIST_ID;

    // Step 1: Fetch all tracks in the playlist to check if the track already exists
    // Note: Spotify API does not support filtering by URI directly in this endpoint.
    // Therefore, you need to fetch existing tracks and check manually.
    const existingTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(uri))&limit=100`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!existingTracksResponse.ok) {
      const errorData = await existingTracksResponse.json();
      console.error("Error Fetching Tracks: ", errorData);
      return NextResponse.json(
        { error: "Failed to fetch existing tracks", details: errorData },
        { status: 400 }
      );
    }

    const existingTracksData = await existingTracksResponse.json();

    // Check if the track exists
    const trackExists = existingTracksData.items.some(
      (item) => item.track.uri === trackUri
    );

    if (trackExists) {
      // Track already exists, no need to add
      return NextResponse.json({ message: "Track already in playlist" });
    }

    // Step 2: Add the track to the playlist
    const addTrackResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      }
    );

    if (addTrackResponse.ok) {
      return NextResponse.json({ message: "Track added successfully!" });
    } else {
      const errorData = await addTrackResponse.json();
      console.log("Error Adding Track: ", errorData);
      return NextResponse.json(
        { error: "Failed to add track", details: errorData },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Catch Block Error: ", error.message);
    return NextResponse.json(
      { error: "Error adding track to playlist", details: error.message },
      { status: 500 }
    );
  }
}
