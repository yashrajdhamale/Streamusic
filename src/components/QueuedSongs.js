import React from "react";
import SongItem from "./SongItem";
import Typography from '@mui/material/Typography';
function QueuedSongs({ onSongSelect, queuedSong }) {
   

    return (
        <>
            {queuedSong.length > 0 && (<div className="p-4">
                <Typography variant="h6" sx={{ color: 'text.primary', marginTop: 2 }}>
                    Queued Songs
                </Typography>
                {queuedSong.map((song, index) => {
                    const track = song.track || {};
                    const title = song.name || song.title || "Unknown Title";
                    const artist = song.artists?.[0]?.name || "";
                    const duration = song.duration_ms || song.duration || 0;
                    const image = song.album?.images?.[0]?.url || song.thumbnail || "";

                    return (
                        <div key={index} onClick={() => onSongSelect(song)}>

                            <SongItem
                                song={{
                                    title,
                                    artist,
                                    duration,
                                    image,
                                }}
                            />

                        </div>
                    );
                })}
            </div>)}</>
    );
}

export default QueuedSongs;
