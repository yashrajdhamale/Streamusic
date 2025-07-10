import { useState, useEffect } from "react";
import { debounce } from "lodash";

import { useDispatch, useSelector } from "react-redux";

import { setQuery } from "../store/searchQuerySlice.js";
import { setWindow } from "../store/changewindowSlice.js";

import Grid from "@mui/material/Grid2";
import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AdminQueue from "./AdminQueue.js";
import QueuedSongs from "./QueuedSongs";
import ListOFSearchedSong from "./SearchedSong";
import MemberQueue from "./MemberQueue";

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

function AdminDashboard({ adminLogin }) {
  const dispatch = useDispatch();
  const [showqueue, setShowQueue] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [queuedSong, setQueue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        minHeight: "100vh",
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
        boxSizing: "border-box",
        bgcolor: "background.default",
        mt: "30px",
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          sx={{ border: 1 }}
        />
      </Search>
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
  );
}
export default AdminDashboard;
