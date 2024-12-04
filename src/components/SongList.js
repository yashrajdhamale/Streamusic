import React, { useState, useEffect } from "react";
import SongItem from "./SongItem";
import { getAccessToken } from "../utils/spotifyApi";

function SongList({ onSongSelect, likedSongs }) {
	
	return (
		<div className="p-4">
			{likedSongs.map((song, index) => (
				<div key={index} onClick={() => onSongSelect(song)}>
					<SongItem
						song={{
							title: song.track.name,
							artist: song.track.artists[0].name,
							duration: song.track.duration_ms,
							image: song.track.album.images[0].url,
						}}
					/>
				</div>
			))}
			{/* {likedSongs.map((song, index) => (
              <li key={index}>{song.track.name}</li>
            ))} */}
		</div>
	);
}

export default SongList;
