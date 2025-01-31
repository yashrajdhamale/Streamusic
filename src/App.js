import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import QueuedSongs from './components/QueuedSongs';
import ListOFSearchedSong from './components/SearchedSong';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useDispatch } from "react-redux";

import { debounce } from 'lodash';

import { setAuth } from "./store/authSlice";
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

  //function for our app to use search feature or app access token
  const fetchAccessToken = async () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
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

  //user access token
  const getuserRefereshtoken = async () => {
    const refreshToken = localStorage.getItem("spotifyRefreshToken");
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const spotifyExpiresAt = parseInt(localStorage.getItem("spotifyExpiresAt"), 10);
    const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");

    if (spotifyExpiresAt < Date.now() || (!spotifyAccessToken || spotifyAccessToken === "null")) {
      if (!refreshToken) return;
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`)
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          }),
        });

        const data = await response.json();

        if (data.access_token) {
          dispatch(setAuth({ userauth: true, UaccessToken: data.access_token }));
          localStorage.setItem("spotifyAccessToken", data.access_token);
          localStorage.setItem("spotifyExpiresAt", Date.now() + data.expires_in * 1000);
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    }
  }

  useEffect(() => {
    const logedIn = localStorage.getItem("logedIn");
    const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");
    if (logedIn) {
      dispatch(setAuth({ userauth: true, UaccessToken: spotifyAccessToken }));
    }

    getuserRefereshtoken();

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
          {windowSize.width < 600 ? (
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
