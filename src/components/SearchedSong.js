import React, { useEffect, useState, useCallback } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress'; import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
export default function SearchedSong({ searchResults, setQueue, loading, setFinalClose }) {
    const [trendingSongs, setTrendingSongs] = useState([]);
    const [closelist, setCloseList] = useState(false);

    const handleCloseList = () => {
        setCloseList(true);
        setFinalClose(true);
    };

    // Fetch trending songs
    const fetchTrendingSongs = async () => {
        const apiKey = 'AIzaSyB8xe-pC_uYbBOdQ9_JldZxJHyZyxGZ2gU'; // Replace with your actual YouTube API key
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&regionCode=IN&videoCategoryId=10&key=${apiKey}`; // Video category ID 10 is for Music

        if (!apiKey) return;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.items) {
                // Correctly map the data for trending music videos
                const trending = data.items.map((item) => ({
                    id: item.id,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.default.url,
                    channelTitle: item.snippet.channelTitle,
                }));

                setTrendingSongs(trending);
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

    const addToQueue = (song) => {
        setQueue((prevQueue) => [...prevQueue, song]);
    };

    return (
        <>
            {!closelist && (
                <div>
                    {loading ? (
                        <div className="flex justify-center">
                            <CircularProgress style={{ color: 'black' }} />
                        </div>
                    ) : (
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {searchResults && searchResults.length > 0 && (
                                <>
                                    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="h6" sx={{ color: 'text.primary', marginTop: 2 }}>
                                                Searched Results:
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" startIcon={<CloseIcon />} sx={{ color: 'text.primary', marginTop: 2 }} onClick={handleCloseList}>
                                                Close
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    {searchResults.map((song) => (
                                        <React.Fragment key={song.id}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt={song.name} src={song.album.images[0]?.url} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={song.name}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                sx={{ color: 'text.primary', display: 'inline' }}
                                                            >
                                                                {song.artists.map((artist) => artist.name).join(', ')}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                                <Checkbox
                                                    onClick={() => addToQueue(song)}
                                                    color="primary"
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </React.Fragment>
                                    ))}
                                </>
                            )}

                            {/* Trending Songs Section */}
                            {searchResults.length == 0 && trendingSongs && trendingSongs.length > 0 && (
                                <div>

                                    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="h6" sx={{ color: 'text.primary', marginTop: 2 }}>
                                                Trending Songs:
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" startIcon={<CloseIcon />} sx={{ color: 'text.primary', marginTop: 2 }} onClick={handleCloseList}>
                                                Close
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    {trendingSongs.map((song) => (
                                        <React.Fragment key={song.id}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt={song.title} src={song.thumbnail} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={song.title}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                sx={{ color: 'text.primary', display: 'inline' }}
                                                            >
                                                                {song.channelTitle}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                                <Checkbox
                                                    onClick={() => addToQueue(song)}
                                                    color="primary"
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        </List>
                    )}
                </div>)}</>
    );
}
