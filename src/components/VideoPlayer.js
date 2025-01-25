import React, { useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null); // Reference to the video element
  const [isPlaying, setIsPlaying] = useState(false); // State for play/pause

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        padding: 2,
        boxShadow: 3,
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        width="100%"
        style={{ borderRadius: '8px' }}
        src={src}
        controls={false} // Hide native controls
      />

      {/* Play/Pause button */}
      <Box sx={{ mt: 2 }}>
        <IconButton onClick={togglePlayPause} color="primary">
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
