import { Cookie } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function LikedSongs() {
    const [likedSongs, setLikedSongs] = useState([]);
    const { userauth, UaccessToken } = useSelector((state) => state.userauth);
    useEffect(() => {
        const fetchLikedSongs = async () => {
            const url = `https://api.spotify.com/v1/me/tracks`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${UaccessToken}`,
                },
            });
            const data = await response.json();
            if (data.items) {
                const likedSongs = data.items.map((item) => ({
                    id: item.track.id,
                    title: item.track.name,
                    artist: item.track.artists.map((artist) => artist.name).join(', '),
                    album: item.track.album.name,
                    duration: item.track.duration_ms,
                    thumbnail: item.track.album.images[0].url,
                }));
                setLikedSongs(likedSongs);
            } else {
                console.error('Error fetching liked songs:', data);
            }
        };
        fetchLikedSongs();
    }, []);
    return (
        <>


        </>
    )
}
