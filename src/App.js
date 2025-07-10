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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  // Fetching the loging cookies
  const fetchAdminCookies = async () => {
    const res = await axios.get(
      "https://streamusic-backend.onrender.com/admin/cookies",
      {
        withCredentials: true, // important to send httpOnly cookies
      }
    );
    return res.data; // { loggedIn: true, adminLogin: true }
  };
  const useAdminAuth = () => {
    return useQuery({
      queryKey: ["adminAuth"],
      queryFn: fetchAdminCookies,
      retry: false, // optional: don't retry if unauthorized
      staleTime: 1000 * 60 * 10, // cache for 10 minutes
    });
  };
  const { data, isLoading, isError } = useAdminAuth();
  const adminLogin = data?.adminLogin ?? false;
  // -------------------------------------------------------------

  const dispatch = useDispatch();

  // const open = useSelector((state) => state.dialog.open);
  // const changewindow = useSelector((state) => state.changewindow.changewindow);

  const [currentSong, setCurrentSong] = useState(null);
  const [queuedSong, setQueue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }} backgroundColor="secondary.light">
        <Nav adminLogin={adminLogin} />
        <Routes>
          <Route path="/Streamusic" element={<Home />} />
          <Route
            path="Streamusic/admin-registration"
            element={<AdminRegistration />}
          />
          <Route path="Streamusic/admin-login" element={<AdminLogin />} />
          <Route path="Streamusic/user-login" element={<UserLogin />} />


          {/* <Route
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
                <Nav
                  setSearchResults={setSearchResults}
                  setShowQueue={setShowQueue}
                  adminLogin={adminLogin}
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
          /> */}
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
