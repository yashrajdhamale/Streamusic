import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Avatar,
  Checkbox,
  Typography,
  Stack,
  Skeleton,
  CircularProgress,
  Paper,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "../store/loadingSlice.js";
import { setSelectedSongs, removeSong } from "../store/selectedsongsSlice.js";

export default function TrendingSongs() {
  const [trendingSongs, setTrendingSongs] = useState([]);

  const fetchTrendingSongs = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${process.env.REACT_APP_BackEnd}/app/getTrendingSongs`
      );

      if (response.status === 200) {
        setTrendingSongs(response.data.trending);
      } else {
        console.error("Failed to fetch trending songs.");
      }
    } catch (error) {
      console.error("Error fetching trending songs:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchTrendingSongs();
  }, []);

  const dispatch = useDispatch();
  const selectedSongs = useSelector((state) => state.selectedSongs.songs);

  const addToSelectedSong = (e, song) => {
    if (e.target.checked) {
      const updated = [...selectedSongs, song];
      dispatch(setSelectedSongs(updated));
    } else {
      dispatch(removeSong(song.id));
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 3,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowY: "auto",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#aaa",
          borderRadius: "4px",
        },
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        🔥 Trending Songs
      </Typography>

      {trendingSongs.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
          <Typography variant="body2" mt={2}>
            Loading trending songs...
          </Typography>
        </Box>
      ) : (
        trendingSongs.map((song) => (
          <Paper
            key={song.id}
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                variant="rounded"
                src={song.thumbnail}
                alt={song.title}
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {song.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {song.channelTitle}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="caption" color="text.secondary">
                {formatDuration(song.duration)}
              </Typography>
              {/* <IconButton onClick={() => toggleLike(song.id)} color="primary">
                {liked[song.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton> */}
              {/* <IconButton color="secondary">
                <PlayArrowIcon />
              </IconButton> */}
              <Checkbox
                color="primary"
                onChange={(e) => addToSelectedSong(e, song)}
              />
            </Stack>
          </Paper>
        ))
      )}
    </Box>
  );
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
