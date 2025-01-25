import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import QueuedSongs from './components/QueuedSongs';
import ListOFSearchedSong from './components/SearchedSong';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { debounce } from 'lodash'; // Import lodash debounce

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [queuedSong, setQueue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [changedwidow, setChangedwindow] = useState(false);
  const [finalclose, setFinalClose] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setChangedwindow(true);
  }, 200); // 200ms debounce delay

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleNextSong = () => {
    if (queuedSong.length > 0) {
      const nextSong = queuedSong[0];
      setCurrentSong(nextSong);
      setQueue(queuedSong.slice(1)); // Remove the first song from the queue
    } else {
      setCurrentSong(null); // No more songs in the queue
    }
  };

  const handlePrevSong = () => {
    // Implement if needed for going to the previous song
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Navbar setSearchResults={setSearchResults} />
          </Grid>
          {windowSize.width < 600 ? (
            <Stack spacing={2}>
              <Grid size={changedwidow ? 12 : 6}>
                <ListOFSearchedSong searchResults={searchResults} setQueue={setQueue} setFinalClose={setFinalClose} />
              </Grid>
              <Grid size={changedwidow ? 12 : 6}>
                <QueuedSongs onSongSelect={setCurrentSong} queuedSong={queuedSong} />
              </Grid>
            </Stack>
          ) : (
            <>
              <Grid size={queuedSong.length == 0 ? 12 : 6}>
                <ListOFSearchedSong searchResults={searchResults} setQueue={setQueue} setFinalClose={setFinalClose} />
              </Grid>
              <Grid size={finalclose ? 12 : 6}>
                <QueuedSongs onSongSelect={setCurrentSong} queuedSong={queuedSong} />
              </Grid>
            </>
          )}
          <Grid size={12}>
            <MusicPlayer
              song={currentSong}
              onNext={handleNextSong}
              onPrev={handlePrevSong}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
