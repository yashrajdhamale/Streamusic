import React, { useEffect, useState, useCallback } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { setQuery } from "../store/searchQuerySlice.js";
import { setLoading } from "../store/loadingSlice.js";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { setOpen } from "../store/dialogSlice.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";




const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar({ setSearchResults, setShowQueue }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery.value);
  const { accessToken, expiresAt } = useSelector((state) => state.auth); // using the access token to search the songs
  const { userauth, UaccessToken } = useSelector((state) => state.userauth); // the ans is true or false
  const open = useSelector((state) => state.dialog.open);
  const [data, setdata] = useState(null);
  const [session, setSession] = React.useState(null);

  const fetchUserData = async (UaccessToken) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${UaccessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      return {
        name: userData.display_name,
        email: userData.email,
        image: userData.images?.[0]?.url || "",
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const logedIn =
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("logedIn="))
      ?.split("=")[1] === "true";
  const adminLogin =
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("adminLogin="))
      ?.split("=")[1] === "true";
  // const authentication = React.useMemo(() => {
  //   return {
  //     signIn: () => {
  //       dispatch(setOpen(true));
  //       if (data) {
  //         setSession({ user: data });
  //       } else if (adminLogin) {
  //         setSession({ user: { name: "Admin", email: "thepack@gmail.com" } });
  //       }
  //     },
  //     signOut: () => {
  //       setSession(null);
  //       document.cookie = "logedIn=; path=/;  Secure;max-age=0; SameSite=None";
  //       document.cookie =
  //         "spotifyAccessToken=; path=/; max-age=0; Secure; SameSite=None";
  //       document.cookie =
  //         "spotifyExpiresAt=; path=/; max-age=0;Secure; SameSite=None";
  //       document.cookie =
  //         "spotifyRefreshToken=; path=/; max-age=0; Secure; SameSite=None";
  //       document.cookie =
  //         "adminLogin=; path=/; Secure;max-age=0; SameSite=None";

  //       dispatch(setAuth({ userauth: false }));
  //       dispatch(setOpen(true));
  //     },
  //   };
  // }, []);

  const showQueue = () => {
    setShowQueue((prevState) => !prevState);
  };

  useEffect(() => {
    if (UaccessToken) {
      fetchUserData(UaccessToken).then((userData) => {
        if (userData) {
          setdata(userData);
          setSession({ user: userData }); // Ensure session format
          dispatch(setOpen(false));
        }
      });
    } else if (adminLogin) {
      setSession({ user: { name: "Admin", email: "thepack@gmail.com" } });
      dispatch(setOpen(false));
    } else {
      dispatch(setOpen(true));
    }
  }, [UaccessToken, adminLogin]); // Added adminLogin dependency

  // Debounced search function
  useEffect(() => {
    if (!accessToken || !searchQuery) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await response.json();
        if (data.tracks) {
          const searchData = data.tracks.items.map((item) => ({
            id: item.id,
            title: item.name,
            thumbnail: item.album.images[0].url,
            duration: item.duration_ms,
            artists: item.artists,
          }));
          setSearchResults(searchData);
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error("Error searching songs:", error);
      }
    }, 500); // ⏳ Waits 500ms before making API request

    return () => clearTimeout(timer); // Cleanup function
  }, [searchQuery, accessToken, setSearchResults]);
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#626eb2",
        light: "#F5EBFF",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "White",
      },
    },
  });
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="secondary" padding="20px" width="auto">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          
            <Typography
              variant="h5"
              sx={{
                fontWeight: 300,
                fontSize: { xs: 13, sm: 14, md: 18 },
                whiteSpace: "nowrap",
                overflow: "visible",
                textOverflow: "clip",
                minWidth: "100px",
              }}
            >
              Streamusic
            </Typography>{" "}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => dispatch(setQuery(e.target.value))}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {auth && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              <Button
                variant="text"
                color="white"
                onClick={showQueue}
                sx={{ padding: 1, minWidth: "auto" }}
              >
                <QueueMusicIcon sx={{ margin: "auto" }} />
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
