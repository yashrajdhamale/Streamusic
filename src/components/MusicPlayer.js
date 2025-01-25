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

  useEffect(() => {
    const fetchVideoId = async () => {
      if (!song || !song.name) return;
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(song.name)}&key=AIzaSyB8xe-pC_uYbBOdQ9_JldZxJHyZyxGZ2gU&type=video&maxResults=1&videoCategoryId=10`
        );
        const data = await response.json();
        const fetchedVideoId = data.items[0]?.id?.videoId;
        if (fetchedVideoId) setVideoId(fetchedVideoId);
      } catch (error) {
        console.error("Error fetching video ID:", error);
      }
    };
    fetchVideoId();
  }, [song]);

  useEffect(() => {
    if ("mediaSession" in navigator && song) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song.name,
        artist: song.artists.map((artist) => artist.name).join(", "),
        album: song.album?.name || "",
        artwork: [{ src: song.album?.images[0]?.url || "https://via.placeholder.com/64", sizes: "96x96", type: "image/png" }]
      });

      navigator.mediaSession.setActionHandler("previoustrack", onPrev);
      navigator.mediaSession.setActionHandler("nexttrack", onNext);
    }
  }, [song, onPrev, onNext]);

  const handleVideoStateChange = (event) => {
    if (event.data === 0) onNext && onNext();
  };

  const handleOnReady = (event) => {
    const player = event.target;
    playerRef.current = player;
    setDuration(player.getDuration());

    const updateCurrentTime = setInterval(() => {
      if (!isSeeking && playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(updateCurrentTime);
  };

  const handleSliderChange = (event, newValue) => {
    setCurrentTime(newValue);
  };

  const handleSliderCommit = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(currentTime, true);
    }
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
      autoplay: 1
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {/* {videoId && (
          <YouTube
            videoId={videoId}
            opts={opts}
            onStateChange={handleVideoStateChange}
            onReady={handleOnReady}
          />
        )} */}

        <CardContent sx={{ textAlign: "center" }}>
          {song ? (
            <>
              <Box sx={{ width: "100%", height: 0, paddingBottom: "56.25%", position: "relative" }}>
                <YouTube
                  videoId={videoId}
                  opts={{ width: "100%", height: "100%", playerVars: { autoplay: 1 } }}
                  onStateChange={handleVideoStateChange}
                  onReady={handleOnReady}
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              </Box>
              <Typography variant="h6" fontWeight="bold">
                {song.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {song.artists.map((artist) => artist.name).join(", ")}
              </Typography>
            </>
          ) : (
            <Typography variant="body1">No song selected</Typography>
          )}
        </CardContent>

        {/* <Box display="flex" alignItems="center" gap={1} width="100%">
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
        </Box> */}

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
