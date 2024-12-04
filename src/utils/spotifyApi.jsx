const clientId = "d637d61c916c42aa8a790e1bc9bdb1b6";
const clientSecret = "6da27c5c10bc417291c74bbd5f726743";

let accessToken = null;
let tokenExpiry = null;

// Step 1: Get Access Token (with caching and refreshing)
export const getAccessToken = async () => {
	try {
		// Check if token is still valid
		if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
			return accessToken; // Return cached token
		}

		// Fetch a new token
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
			},
			body: "grant_type=client_credentials",
		});

		if (!response.ok) {
			throw new Error("Failed to fetch access token");
		}

		const data = await response.json();
		accessToken = data.access_token;
		tokenExpiry = Date.now() + data.expires_in * 1000; // Calculate token expiration time in ms

		return accessToken;
	} catch (error) {
		console.error("Error getting access token:", error);
	}
};

// Step 2: Fetch Artist Info
export const fetchArtist = async (artistName) => {
	try {
		const token = await getAccessToken();
		if (!token) {
			throw new Error("No access token available");
		}

		const response = await fetch(
			`https://api.spotify.com/v1/search?q=${encodeURIComponent(
				artistName
			)}&type=artist`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch artist");
		}

		const data = await response.json();
		return data.artists.items[0]; 
	} catch (error) {
		console.error("Error fetching artist:", error);
	}
};

// // Example Usage
// (async () => {
// 	const artist = await fetchArtist("Ed Sheeran");
// 	console.log("Artist Info:", artist);
// })();
