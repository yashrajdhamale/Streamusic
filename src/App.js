import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { setAuth, setToken } from "./store/authSlice";
import { setWindow } from "./store/changewindowSlice";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Navbar";
import Footer from "./components/Footer";
import AdminQueue from "./components/AdminQueue";
import Navbar from "./components/Navbar";
import QueuedSongs from "./components/QueuedSongs";
import ListOFSearchedSong from "./components/SearchedSong";
import MemberQueue from "./components/MemberQueue";
import AdminRegistration from "./components/AdminRegistration";
import AdminLogin from "./components/AdminLogin";
import UserLogin from "./components/UserLogin";
import Home from "./components/Home";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function App() {
  const logedIn = getCookie("logedIn");
  const adminLogin =
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("adminLogin="))
      ?.split("=")[1] === "true";

  const dispatch = useDispatch();
  const open = useSelector((state) => state.dialog.open);
  const [currentSong, setCurrentSong] = useState(null);
  const [queuedSong, setQueue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const changewindow = useSelector((state) => state.changewindow.changewindow);

  const [showqueue, setShowQueue] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    dispatch(setWindow({ changewindow: true }));
  }, 200); // 200ms debounce delay

  //function for our app to use search feature or app access token
  const fetchAccessToken = async () => {
    const URL = process.env.REACT_APP_SPOTIFY;
    try {
      const response = await fetch(URL, {});
    } catch (error) {}
    // const clientId = process.env.REACT_APP_CLIENT_ID;
    // const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    // const url = "https://accounts.spotify.com/api/token";

    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    //     },
    //     body: new URLSearchParams({ grant_type: "client_credentials" }),
    //   });

    //   const data = await response.json();
    //   if (data.access_token) {
    //     const expiresAt = Date.now() + data.expires_in * 1000;
    //     const accessToken = data.access_token;

    //     document.cookie = `spotify_access_token=${accessToken}; path=/; max-age=${data.expires_in}; Secure; SameSite=None`;
    //     document.cookie = `spotifyAppExpiresAt=${expiresAt}; path=/; max-age=${data.expires_in}; Secure; SameSite=None`;
    //     // Save to Redux
    //     dispatch(setToken({ accessToken: accessToken, expiresAt }));
    //   } else {
    //     console.error("Failed to get access token:", data);
    //   }
    // } catch (error) {
    //   console.error("Error fetching access token:", error);
    // }
  };

  const getToken = async () => {
    const storedToken = getCookie("spotify_access_token");
    const expiresAt = parseInt(getCookie("spotifyAppExpiresAt"), 10);
    if (storedToken) {
      if (Date.now() < expiresAt) {
        // If token is still valid, update Redux & return
        dispatch(setToken({ accessToken: storedToken, expiresAt }));

        return;
      }
    }

    // If token is missing or expired, fetch a new one
    await fetchAccessToken();
  };

  //user access token
  const getuserRefereshtoken = async () => {
    // const clientId = process.env.REACT_APP_CLIENT_ID;
    // const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    // const refreshToken = getCookie("spotifyRefreshToken");
    // const spotifyExpiresAt = parseInt(getCookie("spotifyExpiresAt"), 10);
    // const spotifyAccessToken = getCookie("spotifyAccessToken");
    // if (!refreshToken || refreshToken === "null") return;
    // if (
    //   Date.now() >= spotifyExpiresAt ||
    //   !spotifyAccessToken ||
    //   spotifyAccessToken === "null"
    // ) {
    //   if (!refreshToken) return;
    //   try {
    //     const response = await fetch("https://accounts.spotify.com/api/token", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
    //       },
    //       body: new URLSearchParams({
    //         grant_type: "refresh_token",
    //         refresh_token: refreshToken,
    //       }),
    //     });
    //     const data = await response.json();
    //     if (data.access_token) {
    //       const expiresInMs = Date.now() + data.expires_in * 1000;
    //       dispatch(
    //         setAuth({ userauth: true, UaccessToken: data.access_token })
    //       );
    //       document.cookie = `LogedIn=true; path=/;max-age=${data.expires_in} Secure; SameSite=None`;
    //       document.cookie = `spotifyAccessToken=${data.access_token}; path=/; max-age=${data.expires_in};Secure; SameSite=None`;
    //       document.cookie = `spotifyExpiresAt=${expiresInMs}; max-age=${data.expires_in} path=/; Secure; SameSite=None`;
    //     }
    //   } catch (error) {
    //     console.error("Error refreshing access token:", error);
    //   }
    // }
  };

  useEffect(() => {
    const logedIn = getCookie("logedIn");
    const spotifyAccessToken = getCookie("spotifyAccessToken");
    if (logedIn) {
      dispatch(setAuth({ userauth: true, UaccessToken: spotifyAccessToken }));
    }
    getToken();
    getuserRefereshtoken();

    // Set an interval to refresh token every 60 minutes (3600 sec)
    const refreshInterval = setInterval(() => {
      getuserRefereshtoken();
    }, 3600 * 1000); // 60 min in milliseconds

    return () => clearInterval(refreshInterval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, queuedSong]);
 const theme = createTheme({
    palette: {
      
      secondary: {
        main: "#E0C2FF",
        light: "#e7ecf1",
        white: "white",
        // dark: will be calculated from palette.secondary.main,
        // contrastText: "#47008F",
      },
    },
  });
  return ( <ThemeProvider theme={theme}>
    <Box sx={{ width: "100%" }} backgroundColor="secondary.light" >
      <Nav />
      <Routes>
        <Route
          path="Streamusic/admin-registration"
          element={<AdminRegistration />}
        />

        <Route path="Streamusic/admin-login" element={<AdminLogin />} />
        <Route path="Streamusic/user-login" element={<UserLogin />} />

        <Route path="/Streamusic" element={<Home />} />
        <Route
          path="Streamusic/dashboard"
          element={
            <Box
              component="main"
              sx={{
                width: "100%",
                minHeight: "100vh",
                px: { xs: 2, sm: 4 },
                py: { xs: 4, sm: 6 },
                boxSizing: "border-box",
                bgcolor: "background.default",
              }}
            >
              <Navbar
                setSearchResults={setSearchResults}
                setShowQueue={setShowQueue}
              />

              {windowSize.width < 650 ? (
                <Stack spacing={2}>
                  {showqueue && (
                    <Box>{adminLogin ? <AdminQueue /> : <MemberQueue />}</Box>
                  )}
                  <Box>
                    <ListOFSearchedSong
                      searchResults={searchResults}
                      setQueue={setQueue}
                      adminLogin={adminLogin}
                    />
                  </Box>
                  <Box>
                    <QueuedSongs
                      onSongSelect={setCurrentSong}
                      queuedSong={queuedSong}
                      setQueue={setQueue}
                      adminLogin={adminLogin}
                    />
                  </Box>
                </Stack>
              ) : (
                <Grid container spacing={2}>
                  {showqueue && (
                    <Grid item xs={12}>
                      {adminLogin ? <AdminQueue /> : <MemberQueue />}
                    </Grid>
                  )}

                  <Grid item xs={queuedSong.length === 0 ? 12 : 6}>
                    <ListOFSearchedSong
                      searchResults={searchResults}
                      setQueue={setQueue}
                      adminLogin={adminLogin}
                    />
                  </Grid>

                  {queuedSong.length > 0 && (
                    <Grid item xs={6}>
                      <QueuedSongs
                        onSongSelect={setCurrentSong}
                        queuedSong={queuedSong}
                        setQueue={setQueue}
                        adminLogin={adminLogin}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          }
        />
      </Routes>
      <Footer />
    </Box></ThemeProvider>
  );
}

export default App;
