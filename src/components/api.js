const clientId = "4f474f7b56eb4f5783bc0b2f187d8eda";
const clientSecret = "296b0e7d63314ed9bab2e6fd8b2a34e5";
const baseURL = "https://api.spotify.com/v1";

export const fetchAccessToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });
  const data = await response.json();
  return data.access_token;
};

export const fetchTrendingSongs = async (accessToken) => {
  const url = `${baseURL}/browse/categories/toplists/playlists?country=IN&limit=1`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.playlists?.items || [];
};

export const searchSongs = async (accessToken, query) => {
  const url = `${baseURL}/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.tracks?.items || [];
};
