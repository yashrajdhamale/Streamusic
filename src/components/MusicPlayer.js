import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { Box, Card, CardContent, Typography, Button, Slider, Stack } from "@mui/material";

function MusicPlayer({ song, onPrev, onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const playerRef = useRef(null);

  const fetchVideoId = async () => {
    const query = song?.name || song?.title; // Check for both 'name' and 'title'
    if (!query) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=AIzaSyB8xe-pC_uYbBOdQ9_JldZxJHyZyxGZ2gU&type=video&maxResults=1&videoCategoryId=10`
      );
      const data = await response.json();
      const fetchedVideoId = data.items?.[0]?.id?.videoId;
      if (fetchedVideoId) {
        setVideoId(fetchedVideoId);
      }
    } catch (error) {
      console.error("Error fetching video ID:", error);
    }
  };

  // Call the function inside useEffect
  useEffect(() => {
    fetchVideoId();
  }, [song]);


  useEffect(() => {
    if ("mediaSession" in navigator && song) {
      const { name, artists, album } = song;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        artist: artists?.map((artist) => artist.name).join(", "),
        album: album?.name || "Unknown Album",
        artwork: [{ src: album?.images?.[0]?.url || "", sizes: "96x96", type: "image/png" }]
      });

      navigator.mediaSession.setActionHandler("previoustrack", onPrev);
      navigator.mediaSession.setActionHandler("nexttrack", onNext);
    }
  }, [song, onPrev, onNext]);

  const handleVideoStateChange = (event) => {
    if (event.data === 0) onNext?.();
  };

  const handleOnReady = (event) => {
    playerRef.current = event.target;
    setDuration(playerRef.current.getDuration());
    const interval = setInterval(() => {
      if (!isSeeking) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const handleSliderChange = (event, value) => {
    setIsSeeking(true);
    setCurrentTime(value);
  };

  const handleSliderCommit = () => {
    playerRef.current?.seekTo(currentTime);
    setIsSeeking(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {videoId ? (
          <Box sx={{ width: "100%", height: 0, paddingBottom: "56.25%", position: "relative" }}>
            <YouTube
              videoId={videoId}
              opts={{ width: "100%", height: "100%", playerVars: { autoplay: 1 } }}
              onStateChange={handleVideoStateChange}
              onReady={handleOnReady}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </Box>
        ) : (
          <Typography variant="body1">No video available</Typography>
        )}

        <CardContent sx={{ textAlign: "center" }}>
          {song ? (
            <>
              <Typography variant="h6" fontWeight="bold">
                {song.name || song.title || "Unknown Title"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {song.artists?.map((artist) => artist.name).join(", ") || ""}
              </Typography>
            </>
          ) : (
            <Typography variant="body1">No song selected</Typography>
          )}
        </CardContent>

        <Box display="flex" alignItems="center" gap={2} width="100%">
          <Typography variant="body2">{formatTime(currentTime)}</Typography>
          <Slider
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderCommit}
            sx={{ flex: 1 }}
          />
          <Typography variant="body2">{formatTime(duration)}</Typography>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={onPrev}>
            Previous
          </Button>
          <Button variant="contained" onClick={onNext}>
            Next
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

export default MusicPlayer;
