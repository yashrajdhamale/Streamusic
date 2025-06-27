import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { useSelector } from "react-redux";

import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_BackEnd); // initiates a connection from the client to your backend server using the URL provided and triggers the io.connection function

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const LoginDialog = ({ open, handleClose }) => {
  const { UaccessToken } = useSelector((state) => state.userauth);
  const dispatch = useDispatch();
  const { userauth } = useSelector((state) => state.userauth);
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-read-private user-read-email playlist-read-private user-library-read`;

  // Refs for email and password inputs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const fetchAccessToken = async (code) => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        const expiresIn = Date.now() + data.expires_in * 1000; // Convert to milliseconds
        // Secure;
        document.cookie = `spotifyAccessToken=${data.access_token}; path=/; max-age=${data.expires_in}; Secure; SameSite=None`;
        document.cookie = `spotifyRefreshToken=${data.refresh_token}; path=/; max-age=${data.expires_in}; Secure; SameSite=None`;
        document.cookie = `spotifyExpiresAt=${expiresIn}; path=/; max-age=${data.expires_in}; Secure; SameSite=None`;
        document.cookie = `logedIn=true; path=/; max-age=${data.expires_in}; Secure; SameSite=None`;
        document.cookie = `adminLogin=false; path=/; max-age=${data.expires_in}; Secure; SameSite=None`;

        dispatch(setAuth({ userauth: true, UaccessToken: data.access_token }));

        handleClose();
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  // Check for authorization code in URL and fetch token
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    if (authCode && !UaccessToken) {
      fetchAccessToken(authCode);
    }
  }, []);

  // Handle Spotify login button click
  const handleSpotifyLogin = () => {
    window.location.href = spotifyAuthUrl;
  };

  const handleAdminLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    if (email === "thepack@gmail.com" && password === "packk") {
      document.cookie = `logedIn=true; path=/; max-age=${6 * 60 * 60}; Secure; SameSite=None`;
      document.cookie = `adminLogin=true; path=/; max-age=${6 * 60 * 60}; Secure; SameSite=None`;
      socket.emit("admin");
      handleClose();
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          id="email"
          inputRef={emailRef} // Use ref for email
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          id="password"
          inputRef={passwordRef} // Use ref for password
        />

        <Button onClick={handleAdminLogin} color="primary">
          Login
        </Button>
      </DialogContent>
      <Box sx={{ textAlign: "center", mt: 2, mb: 4 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleSpotifyLogin}
        >
          Sign in with Spotify
        </Button>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
