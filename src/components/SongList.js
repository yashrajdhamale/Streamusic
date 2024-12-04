import React, { useState, useEffect } from "react";
import SongItem from "./SongItem";
import { getAccessToken } from "../utils/spotifyApi";

function SongList({ onSongSelect }) {
	const [songs, setSongs] = useState([]);

	useEffect(() => {
		async function fetchSongs() {
			try {
				const token = await getAccessToken();
				if (!token) {
					throw new Error("No access token available");
				}
				const response = await fetch(
					`https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=10`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch songs");
				}
				const data = await response.json();
				setSongs(data.tracks.items);
			} catch (error) {
				console.error("Error fetching songs:", error);
			}
		}
		fetchSongs();
	}, []);

	return (
		<div className="p-4">
			{songs.map((song, index) => (
				<div key={index} onClick={() => onSongSelect(song)}>
					<SongItem
						song={{
							title: song.name,
							artist: song.artists[0].name,
							duration: song.duration_ms,
							image: song.album.images[0].url,
						}}
					/>
				</div>
			))}
		</div>
	);
}

export default SongList;
