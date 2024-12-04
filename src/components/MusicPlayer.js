import { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";

function MusicPlayer({ song, onPrev, onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [currentTime, setCurrentTime] = useState(0); // Current time of the video
  const [duration, setDuration] = useState(0); // Total duration of the video
  const [isSeeking, setIsSeeking] = useState(false); // Track if the user is seeking
  const playerRef = useRef(null); // Reference to store the YouTube player instance

  useEffect(() => {
    const fetchVideoId = async () => {
      if (!song || !song.name) return;

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(song.name)}&key=AIzaSyB8xe-pC_uYbBOdQ9_JldZxJHyZyxGZ2gU&type=video&maxResults=1&videoCategoryId=10`
        );
        const data = await response.json();
        const fetchedVideoId = data.items[0]?.id?.videoId;

        if (fetchedVideoId) {
          setVideoId(fetchedVideoId); // Set the video ID to play
        }
      } catch (error) {
        console.error("Error fetching video ID:", error);
      }
    };

    fetchVideoId();
  }, [song]);

  useEffect(() => {
    // Media Session API setup for background control
    if ("mediaSession" in navigator && song) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song.name,
        artist: song.artists.map((artist) => artist.name).join(", "),
        album: song.album?.name || "",
        artwork: [{ src: song.album?.images[0]?.url || "https://via.placeholder.com/64", sizes: "96x96", type: "image/png" }]
      });

      navigator.mediaSession.setActionHandler("play", () => {
        togglePlayPause(true); // Resume playback
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        togglePlayPause(false); // Pause playback
      });

      navigator.mediaSession.setActionHandler("previoustrack", onPrev);
      navigator.mediaSession.setActionHandler("nexttrack", onNext);
    }
  }, [song, onPrev, onNext]);

  useEffect(() => {
    // Visibility change handler
    const handleVisibilityChange = () => {
      const player = playerRef.current;
      if (document.visibilityState === "hidden" && isPlaying) {
        // Keep playing if the tab is minimized or hidden
        player?.playVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const togglePlayPause = (play) => {
    const player = playerRef.current;
    if (play || (isPlaying === false && typeof play === "undefined")) {
      player.playVideo();
      setIsPlaying(true);
      navigator.mediaSession.playbackState = "playing"; // Update media session state
    } else {
      player.pauseVideo();
      setIsPlaying(false);
      navigator.mediaSession.playbackState = "paused"; // Update media session state
    }
  };

  const handleVideoStateChange = (event) => {
    const playerStatus = event.data;
    if (playerStatus === 0) {
      onNext && onNext(); // Automatically go to the next song when the video ends
    }
  };

  const handleOnReady = (event) => {
    const player = event.target;
    playerRef.current = player; // Store the player instance
    setDuration(player.getDuration()); // Set total duration when video is ready

    // Continuously update current time only if not seeking
    const updateCurrentTime = setInterval(() => {
      if (!isSeeking && playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(updateCurrentTime); // Clear the interval when component unmounts
  };

  const handleSliderChange = (event) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime); // Update currentTime as the slider moves
  };

  const handleSliderMouseDown = () => {
    setIsSeeking(true); // User started dragging the slider
  };

  const handleSliderMouseUp = () => {
    const player = playerRef.current;
    if (player) {
      player.seekTo(currentTime, true); // Seek to the selected time
    }
    setIsSeeking(false); // User stopped dragging
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // YouTube player options
  const opts = {
    height: "0", // Hide the player (just for audio feel)
    width: "0",
    playerVars: {
      autoplay: 1, // Auto-play on load
      controls: 0, // Hide YouTube player controls
    },
  };

  return (
    <div className="bg-gray-800 p-4 flex items-center justify-between text-white">
      <div className="flex items-center">
        {song && (
          <img
            src={song.album?.images[0]?.url || "https://via.placeholder.com/64"}
            alt={song.name}
            className="w-16 h-16 mr-4 rounded"
          />
        )}
        <div>
          {song ? (
            <>
              <div className="text-lg font-semibold">{song.name}</div>
              <div className="text-sm text-gray-400">
                {song.artists.map((artist) => artist.name).join(", ")}
              </div>
            </>
          ) : (
            <div>No song selected</div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center">
        <button
          className="mx-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          onClick={onPrev}
        >
          Prev
        </button>
        <button
          className="mx-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          onClick={() => togglePlayPause()}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="mx-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          onClick={onNext}
        >
          Next
        </button>
      </div>

      {/* Slider for video duration */}
      {videoId && (<div className="w-1/2 flex items-center">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          onMouseDown={handleSliderMouseDown}
          onMouseUp={handleSliderMouseUp}
          className="mx-4 w-full"
        />
        <span>{formatTime(duration)}</span>
      </div>)}

      {/* YouTube Player */}
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={opts}
          onStateChange={handleVideoStateChange}
          onReady={handleOnReady}
        />
      )}
    </div>
  );
}

export default MusicPlayer;
