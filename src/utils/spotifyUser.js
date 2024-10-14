import axios from "axios";
import qs from "qs";

// In-memory storage for user access token and its expiry
let userAccessToken = process.env.SPOTIFY_ACCESS_TOKEN || null;
let userTokenExpiry = null;

// Function to set the user access token and its expiry
function setUserAccessToken(token, expiresIn) {
  userAccessToken = token;
  // Set token expiry time (current time + expires_in seconds - buffer)
  userTokenExpiry = Date.now() + (expiresIn - 60) * 1000; // 60-second buffer
}

// Function to check if the user token is expired
function isUserTokenExpired() {
  if (!userAccessToken || !userTokenExpiry) return true;
  return Date.now() > userTokenExpiry;
}

// Function to refresh the user access token using the refresh token
export async function refreshSpotifyAccessToken() {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const tokenUrl = "https://accounts.spotify.com/api/token";

  const data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
  };

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    const { access_token, expires_in } = response.data;
    setUserAccessToken(access_token, expires_in);
    return access_token;
  } catch (error) {
    console.error(
      "Error refreshing Spotify user access token:",
      error.response?.data || error.message
    );
    return null;
  }
}

// Function to get a valid user access token
export async function getValidUserAccessToken() {
  if (isUserTokenExpired()) {
    const newToken = await refreshSpotifyAccessToken();
    if (!newToken) {
      throw new Error("Unable to refresh Spotify user access token");
    }
    return newToken;
  }
  return userAccessToken;
}
