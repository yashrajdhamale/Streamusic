import React, { useEffect, useState, useCallback } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Navbar({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Fetch access token when the component mounts
    const fetchAccessToken = async () => {
      const clientId = '4f474f7b56eb4f5783bc0b2f187d8eda';
      const clientSecret = '296b0e7d63314ed9bab2e6fd8b2a34e5';
      const url = 'https://accounts.spotify.com/api/token';

      try {
        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
          }),
        };

        const response = await fetch(url, payload);
        const data = await response.json();

        if (data.access_token) {
          setAccessToken(data.access_token);
        } else {
          console.error('Error fetching access token:', data);
        }
      } catch (error) {
        console.error('Error during access token fetch:', error);
      }
    };

    fetchAccessToken();
  }, []);

  const searchSongs = useCallback(
    async (query) => {
      if (!accessToken || !query) return;

      try {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await response.json();

        if (data.tracks) {
          setSearchResults(data.tracks.items);
        } else {
          console.error('Error fetching search results:', data);
        }
      } catch (error) {
        console.error('Error during song search:', error);
      }
    },
    [accessToken, setSearchResults]
  );

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchSongs(query);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Streamusic
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
