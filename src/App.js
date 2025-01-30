import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import QueuedSongs from './components/QueuedSongs';
import ListOFSearchedSong from './components/SearchedSong';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

import { debounce } from 'lodash'; // Import lodash debounce


import { useDispatch } from "react-redux";
import { setToken } from "./store/authSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [queuedSong, setQueue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [changedwidow, setChangedwindow] = useState(false);
  const [finalclose, setFinalClose] = useState(false);


  const dispatch = useDispatch();


  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setChangedwindow(true);
  }, 200); // 200ms debounce delay


  const fetchAccessToken = async () => {
    const clientId = "4f474f7b56eb4f5783bc0b2f187d8eda";
    const clientSecret = "296b0e7d63314ed9bab2e6fd8b2a34e5";
    const url = "https://accounts.spotify.com/api/token";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: new URLSearchParams({ grant_type: "client_credentials" }),
      });

      const data = await response.json();
      if (data.access_token) {
        const expiresAt = Date.now() + data.expires_in * 1000;
        const accessToken = data.access_token;

        // Save to localStorage
        localStorage.setItem(
          "spotify_access_token",
          JSON.stringify({ accessToken, expiresAt })
        );

        // Save to Redux
        dispatch(setToken({ accessToken, expiresAt }));
      } else {
        console.error("Failed to get access token:", data);
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const getToken = async () => {
    const storedToken = localStorage.getItem("spotify_access_token");

    if (storedToken) {
      const { accessToken, expiresAt } = JSON.parse(storedToken);
      if (Date.now() < expiresAt) {
        // If token is still valid, update Redux & return
        dispatch(setToken({ accessToken, expiresAt }));
        return;
      }
    }

    // If token is missing or expired, fetch a new one
    await fetchAccessToken();
  };


  useEffect(() => {
    getToken();
  }, []);



  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);



  const handleNextSong = () => {
    if (queuedSong.length > 0) {
      const nextSong = queuedSong[0];
      setCurrentSong(nextSong);
      setQueue(queuedSong.slice(1)); // Remove the first song from the queue
    } else {
      setCurrentSong(null); // No more songs in the queue
    }
  };

  const handlePrevSong = () => {
    // Implement if needed for going to the previous song
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Navbar setSearchResults={setSearchResults} />
          </Grid>
          {/* {windowSize.width < 600 ? (
            <Stack spacing={2}>
              <Grid size={changedwidow ? 12 : 6}>
                <ListOFSearchedSong searchResults={searchResults} setQueue={setQueue} setFinalClose={setFinalClose} />
              </Grid>
              <Grid size={changedwidow ? 12 : 6}>
                <QueuedSongs onSongSelect={setCurrentSong} queuedSong={queuedSong} />
              </Grid>
            </Stack>
          ) : (
            <>
              <Grid size={queuedSong.length == 0 ? 12 : 6}>
                <ListOFSearchedSong searchResults={searchResults} setQueue={setQueue} setFinalClose={setFinalClose} />
              </Grid>
              <Grid size={finalclose ? 12 : 6}>
                <QueuedSongs onSongSelect={setCurrentSong} queuedSong={queuedSong} />
              </Grid>
            </>
          )}
          <Grid size={12}>
            <MusicPlayer
              song={currentSong}
              onNext={handleNextSong}
              onPrev={handlePrevSong}
            />
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default App;
