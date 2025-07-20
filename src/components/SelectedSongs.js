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
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { removeSong, clearSelectedSongs } from "../store/selectedsongsSlice.js";

import CancelIcon from "@mui/icons-material/Cancel";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function TrendingSongs() {
  const dispatch = useDispatch();
  const selectedSongs = useSelector((state) => state.selectedSongs.songs);

  const addSong = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BackEnd}/admin/addSong`,
        { songs: selectedSongs }, // <-- Send as 'songs'
        { withCredentials: true } // to send cookies
      );

      if (response.status === 200) {
        dispatch(clearSelectedSongs());
        alert("Songs added");
        
      } else {
        console.error("Failed to add songs");
      }
    } catch (error) {
      console.error("Error adding songs:", error);
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
        Selected Songs
      </Typography>

      {selectedSongs.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" mt={2}>
            Add Songs
          </Typography>
        </Box>
      ) : (
        selectedSongs.map((song) => (
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
              <CancelIcon
                sx={{ cursor: "pointer" }}
                onClick={(e) => {
                  dispatch(removeSong(song.id));
                }}
              />
            </Stack>
          </Paper>
        ))
      )}
      {selectedSongs.length !== 0 && (
        <Button
          variant="solid"
          color="primary"
          size="small"
          sx={{
            borderRadius: "30px",
            px: 4,
            fontWeight: "bold",
            backgroundColor: "#565add",
            color: "#fff",
            "&:hover": {
              transform: "scale(1.05)",
            },
            transition: "all 0.3s ease",
            boxShadow: "lg",
            maxWidth: "200px",
            width: "200px",
            height: "60px",
            border: "5px solid #4B42AD",
          }}
          onClick={addSong}
        >
          Add to playlist
        </Button>
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
