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
import LoginDialog from "./LoginDialog";
import { useSelector } from "react-redux";
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';

// Styled Search Component
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


const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};
function Navbar({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { accessToken, expiresAt } = useSelector((state) => state.auth);
  const { userauth } = useSelector((state) => state.userauth);
  const [open, setOpen] = useState(false);

  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const handleClose = () => {
    setOpen(false)
    // setLogout(true);

  }

  // Debounced search function
  useEffect(() => {
    if (!accessToken || !searchQuery) return;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await response.json();
        if (data.tracks) setSearchResults(data.tracks.items);
      } catch (error) {
        console.error("Error searching songs:", error);
      }
    }, 500); // ⏳ Waits 500ms before making API request

    return () => clearTimeout(timer); // Cleanup function
  }, [searchQuery, accessToken, setSearchResults]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 100,
              fontSize: { xs: 13, sm: 14, md: 18 },
              whiteSpace: "nowrap",
              overflow: "visible",
              textOverflow: "clip",
              minWidth: "120px",
            }}
          >
            PACK PLAYER
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {!userauth ? (<Button color="inherit" onClick={() => setOpen(true)}>
              <Typography variant="h6" sx={{ fontWeight: 100, fontSize: 15 }}>
                Login
              </Typography>
            </Button>) : (<Typography variant="h6" sx={{ fontWeight: 100, fontSize: 15 }}><AuthenticationContext.Provider value={authentication}>
              <SessionContext.Provider value={session}>
                {/* preview-start */}
                <Account />
                {/* preview-end */}
              </SessionContext.Provider>
            </AuthenticationContext.Provider> </Typography>)}
          <LoginDialog open={open} handleClose={handleClose} />
        </Box>
      </Toolbar>
    </AppBar>
    </Box >
  );
}

export default Navbar;
