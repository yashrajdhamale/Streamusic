// import React, { useState, useEffect, useRef } from "react";
// import YouTube from "react-youtube";
// import { Box, Card, Typography, Button, Slider, Stack } from "@mui/material";
// import Grid from "@mui/material/Grid2";

// function MusicPlayer({ song, onPrev, onNext }) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [videoId, setVideoId] = useState("");
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isSeeking, setIsSeeking] = useState(false);
//   const playerRef = useRef(null);

//   const youtubekey = process.env.REACT_APP_YOUTUBEKEY;

//   const fetchVideoId = async () => {
//     const query = song?.name || song?.title;
//     if (!query) return;

//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${youtubekey}&type=video&maxResults=1&videoCategoryId=10`
//       );
//       const data = await response.json();
//       const fetchedVideoId = data.items?.[0]?.id?.videoId;
//       if (fetchedVideoId) {
//         setVideoId(fetchedVideoId);
//       }
//     } catch (error) {
//       console.error("Error fetching video ID:", error);
//     }
//   };

//   useEffect(() => {
//     fetchVideoId();
//   }, [song]);

//   useEffect(() => {
//     if ("mediaSession" in navigator && song) {
//       const { name, artists, album } = song;
//       navigator.mediaSession.metadata = new MediaMetadata({
//         title: name,
//         artist: artists?.map((artist) => artist.name).join(", "),
//         album: album?.name || "Unknown Album",
//         artwork: [
//           { src: album?.images?.[0]?.url || "", sizes: "96x96", type: "image/png" },
//         ],
//       });

//       navigator.mediaSession.setActionHandler("previoustrack", onPrev);
//       navigator.mediaSession.setActionHandler("nexttrack", onNext);
//     }
//   }, [song, onPrev, onNext]);

//   const handleVideoStateChange = (event) => {
//     if (event.data === 0) onNext?.();
//   };

//   const handleOnReady = (event) => {
//     playerRef.current = event.target;
//     setDuration(playerRef.current.getDuration());
//     const interval = setInterval(() => {
//       if (!isSeeking) {
//         setCurrentTime(playerRef.current.getCurrentTime());
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   };

//   const handleSliderChange = (event, value) => {
//     setIsSeeking(true);
//     setCurrentTime(value);
//   };

//   const handleSliderCommit = () => {
//     playerRef.current?.seekTo(currentTime);
//     setIsSeeking(false);
//   };

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   const opts = {
//     height: "0",
//     width: "0",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         bottom: 0,
//         left: 0,
//         width: "100%",
//         backgroundColor: "#fff",
//         boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
//         zIndex: 1000,
//         p: 2,
//       }}
//     >
//       <Grid container alignItems="center" justifyContent="space-between">
//         {/* Video Section */}
//         <Grid item xs={3} alignItems="center">
//           {videoId ? (
//             <Box
//               sx={{
//                 width: "0",
//                 height: "0",
//                 position: "relative",
//                 overflow: "hidden",
//               }}
//             >
//               <YouTube
//                 videoId={videoId}
//                 opts={{
//                   width: "0",
//                   height: "0",
//                   playerVars: { autoplay: 1 },
//                 }}
//                 onStateChange={handleVideoStateChange}
//                 onReady={handleOnReady}
//                 style={{ position: "absolute", top: 0, left: 0 }}
//               />
//             </Box>
//           ) : (
//             <Typography variant="body1">No video available</Typography>
//           )}
//         </Grid>

//         {/* Song Info and Controls */}
//         <Grid item xs={9}>
//           <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
//             <Box flex={1}>
//               {song ? (
//                 <>
//                   <Typography variant="h6" fontWeight="">
//                     {song.name || song.title || "Unknown Title"}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {song.artists?.map((artist) => artist.name).join(", ") || ""}
//                   </Typography>
//                 </>
//               ) : (
//                 <Typography variant="body1">No song selected</Typography>
//               )}
//             </Box>

//             <Box flex={2}>
//               <Stack spacing={1} direction="row" alignItems="center">
//                 <Typography variant="body2">{formatTime(currentTime)}</Typography>
//                 <Slider
//                   value={currentTime}
//                   min={0}
//                   max={duration}
//                   onChange={handleSliderChange}
//                   onChangeCommitted={handleSliderCommit}
//                   sx={{ flex: 1 }}
//                 />
//                 <Typography variant="body2">{formatTime(duration)}</Typography>
//               </Stack>
//             </Box>

//             <Stack direction="row" spacing={2}>
//               <Button variant="outlined" onClick={onPrev}>
//                 Previous
//               </Button>
//               <Button variant="contained" onClick={onNext}>
//                 Next
//               </Button>
//             </Stack>
//           </Stack>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default MusicPlayer;

// ==============================

import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { Box, Card, Typography, Button, Slider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PlayArrow, Pause } from "@mui/icons-material";

function MusicPlayer({ song, onPrev, onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const playerRef = useRef(null);

  const youtubekey = process.env.REACT_APP_YOUTUBEKEY;

  const fetchVideoId = async () => {
    const query = song?.name || song?.title;
    if (!query) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${youtubekey}&type=video&maxResults=1&videoCategoryId=10`
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
        artwork: [
          { src: album?.images?.[0]?.url || "", sizes: "96x96", type: "image/png" },
        ],
      });

      navigator.mediaSession.setActionHandler("previoustrack", onPrev);
      navigator.mediaSession.setActionHandler("nexttrack", onNext);
      navigator.mediaSession.setActionHandler("play", handlePlayPause);
      navigator.mediaSession.setActionHandler("pause", handlePlayPause);
    }
  }, [song, onPrev, onNext]);

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoStateChange = (event) => {
    if (event.data === 0) onNext?.();
    if (event.data === 1) setIsPlaying(true); // Playing
    if (event.data === 2) setIsPlaying(false); // Paused
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

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        p: 2,
      }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={0}>
          {videoId && (
            <YouTube
              videoId={videoId}
              opts={{ width: "0", height: "0", playerVars: { autoplay: 1 } }}
              onStateChange={handleVideoStateChange}
              onReady={handleOnReady}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
            <Box flex={1}>
              {song ? (
                <>
                  <Typography variant="h6">{song.name || song.title || "Unknown Title"}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {song.artists?.map((artist) => artist.name).join(", ") || ""}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1">No song selected</Typography>
              )}
            </Box>
            <Box flex={2}>
              <Stack spacing={1} direction="row" alignItems="center">
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
              </Stack>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={onPrev}>Previous</Button>
              <Button variant="contained" onClick={handlePlayPause}>
                {isPlaying ? <Pause /> : <PlayArrow />}
              </Button>
              <Button variant="contained" onClick={onNext}>Next</Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MusicPlayer;
