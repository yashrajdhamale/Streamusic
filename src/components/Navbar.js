import React, { useEffect, useState } from 'react';

function Navbar({ setLikedSongs }) {
  const [userData, setUserData] = useState(null);

  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const codeVerifier = generateRandomString(64);

  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const redirectToSpotify = async () => {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const clientId = '1f4050f896f5482e91355d3c6ea5dd46';
    const redirectUri = 'https://sarathi062.github.io/Streamusic/callback'; // Keep this as-is
    const scope = 'user-read-private user-read-email user-library-read';
  
    window.localStorage.setItem('code_verifier', codeVerifier);
  
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };
  
    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(params).toString()}`;
    window.location.href = authUrl;
  };
  

  const getToken = async (code) => {
    const clientId = '1f4050f896f5482e91355d3c6ea5dd46';
    const redirectUri = 'https://sarathi062.github.io/Streamusic/callback';
    const codeVerifier = localStorage.getItem('code_verifier');
    const url = 'https://accounts.spotify.com/api/token';

    const payload = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('token_expires', Date.now() + data.expires_in * 1000); // Store token expiration time
      fetchSpotifyUser(data.access_token);
      fetchLikedSongs(data.access_token);
    } else {
      console.error('Error fetching access token:', data);
    }
  };

  const fetchSpotifyUser = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUserData(data);
  };

  const fetchLikedSongs = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me/tracks?limit=50', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setLikedSongs(data.items);
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return;

    const clientId = '1f4050f896f5482e91355d3c6ea5dd46';
    const url = 'https://accounts.spotify.com/api/token';

    const payload = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('token_expires', Date.now() + data.expires_in * 1000);
      fetchSpotifyUser(data.access_token);
      fetchLikedSongs(data.access_token);
    } else {
      console.error('Error refreshing access token:', data);
    }
  };

  const checkTokenAndFetch = async () => {
    const token = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('token_expires');
    if (token && expiresAt && Date.now() < expiresAt) {
      fetchSpotifyUser(token);
      fetchLikedSongs(token);
    } else {
      await refreshToken();
    }
  };

  useEffect(() => {
    const urlHash = window.location.hash;
    const codeMatch = urlHash.match(/code=([^&]+)/);
    const code = codeMatch ? codeMatch[1] : null;
  
    const storedAccessToken = localStorage.getItem('access_token');
  
    const handleAuthCallback = async () => {
      if (code) {
        await getToken(code);
  
        // Remove the hash from the URL without refreshing the page
        const newUrl = `${window.location.origin}${window.location.pathname}`;
        window.history.pushState({}, document.title, newUrl);
      } else if (storedAccessToken) {
        // If access token exists, fetch user data and liked songs
        fetchSpotifyUser(storedAccessToken);
        fetchLikedSongs(storedAccessToken);
      } else {
        // If no access token, try refreshing it
        refreshToken();
      }
    };
  
    handleAuthCallback();
  }, []);
  
  

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <div>Streamusic</div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 p-2 rounded"
        />
        {!userData && (
          <div className="ml-4 cursor-pointer text-white" onClick={redirectToSpotify}>
            Login with Spotify
          </div>
        )}
      </div>
      {userData && (
        <div className="text-white mt-4">
          <h3>{`Hello, ${userData.display_name}`}</h3>
        </div>
      )}
    </div>
  );
}

export default Navbar;
