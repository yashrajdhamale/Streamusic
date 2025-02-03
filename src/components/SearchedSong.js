import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material/Grid2';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/loadingSlice.js";
import { setUserQueueCount } from "../store/usercountSlice.js";

import {
    List, ListItem, ListItemAvatar, ListItemText, Avatar, Checkbox,
    Divider, Typography, Stack, CircularProgress, Skeleton
} from "@mui/material";
import { get } from 'lodash';



export default function SearchedSong({ searchResults, setQueue }) {
    const dispatch = useDispatch();
    const [trendingSongs, setTrendingSongs] = useState([]);
    const MAX_QUEUE_LIMIT = 5; // Set max limit
    const searchQuery = useSelector((state) => state.searchQuery.value);
    const loading = useSelector((state) => state.loading.loading);
    const count = useSelector((state) => state.userqueuecount.userqueuecount);

    const queueCount = parseInt(document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('queueCount='))
        ?.split('=')[1] || 0);


    const convertYouTubeDurationToMS = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        const hours = match[1] ? parseInt(match[1]) : 0;
        const minutes = match[2] ? parseInt(match[2]) : 0;
        const seconds = match[3] ? parseInt(match[3]) : 0;

        // Convert to milliseconds
        const totalMilliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

        return totalMilliseconds;
    };


    const fetchTrendingSongs = async () => {
        const apiKey = process.env.REACT_APP_YOUTUBEKEY;
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&regionCode=IN&videoCategoryId=10&key=${apiKey}&maxResults=4`; // Video category ID 10 is for Music

        if (!apiKey) return;

        try {
            dispatch(setLoading(true));
            const response = await fetch(url);
            const data = await response.json();
            if (data.items) {
                const trending = data.items.map((item) => ({
                    id: item.id,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.default.url,
                    channelTitle: item.snippet.channelTitle,
                    duration: convertYouTubeDurationToMS(item.contentDetails.duration),
                }));

                setTrendingSongs(trending);
                dispatch(setLoading(false));
            } else {
                console.error('Error fetching trending songs:', data);
            }
        } catch (error) {
            console.error('Error during trending songs fetch:', error);
        }
    };

    useEffect(() => {
        fetchTrendingSongs();
    }, []);


    const addToQueue = (song, isChecked) => {
        setQueue((prevQueue) => {
            if (isChecked) {
                if (count < MAX_QUEUE_LIMIT) {
                    dispatch(setUserQueueCount(count + 1));
                    return [...prevQueue, song]; // Add song
                } else {
                    return prevQueue; // Don't add if limit reached
                }
            } else {
                dispatch(setUserQueueCount(count - 1)); // Decrease count
                return prevQueue.filter((s) => s.id !== song.id); // Remove song
            }
        });
    };
    return (
        <Stack spacing={3} sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
            {loading ? (
                <Stack alignItems="center">
                    <CircularProgress style={{ color: "black" }} />
                </Stack>
            ) : (
                // Wrap List in a Box with a fixed height and scroll
                <Box sx={{
                    maxHeight: "400px",  // Adjust height as needed
                    overflowY: "auto",
                    scrollbarWidth: "thin", // Firefox
                    "&::-webkit-scrollbar": { width: "8px" }, // WebKit browsers
                    "&::-webkit-scrollbar-thumb": { background: "#888", borderRadius: "4px" }
                }}>
                    <List sx={{ width: "100%" }}>
                        {/* 🔍 Searched Results Section */}
                        {searchQuery && searchResults.length > 0 && (
                            <>
                                <Typography variant="h6" color="text.primary">
                                    Searched Results:
                                </Typography>
                                {searchResults.map((song) => (
                                    <React.Fragment key={song.id}>
                                        <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                                            <ListItemAvatar>
                                                {song.album?.images?.[0]?.url ? (
                                                    <Avatar alt={song.name} src={song.album.images[0].url} />
                                                ) : (
                                                    <Skeleton variant="circular" width={40} height={40} />
                                                )}
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={song.name}
                                                secondary={
                                                    <Typography variant="body2" color="text.secondary">
                                                        {song.artists.map((artist) => artist.name).join(", ")}
                                                    </Typography>
                                                }
                                            />
                                            <Checkbox
                                                onClick={(e) => addToQueue(song, e.target.checked)}
                                                color="primary"
                                                disableRipple
                                                disabled={queueCount + count >= MAX_QUEUE_LIMIT}
                                            />

                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                ))}
                            </>
                        )}

                        {/* 🔥 Trending Songs Section */}
                        {!searchQuery && trendingSongs?.length > 0 && (
                            <>
                                <Typography variant="h6" color="text.primary">
                                    Trending Songs:
                                </Typography>
                                {trendingSongs.map((song) => (
                                    <React.Fragment key={song.id}>
                                        <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                                            <ListItemAvatar>
                                                {song.thumbnail ? (
                                                    <Avatar alt={song.title} src={song.thumbnail} />
                                                ) : (
                                                    <Skeleton variant="circular" width={40} height={40} />
                                                )}
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={song.title}
                                                secondary={
                                                    <Typography variant="body2" color="text.secondary">
                                                        {song.channelTitle}
                                                    </Typography>
                                                }
                                            />
                                            <Checkbox
                                                onClick={(e) => addToQueue(song, e.target.checked)}
                                                color="primary"
                                                disableRipple
                                                disabled={queueCount + count >= MAX_QUEUE_LIMIT}
                                            />

                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                ))}
                            </>
                        )}
                    </List>
                </Box>
            )}
        </Stack>
    );
}
