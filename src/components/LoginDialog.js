import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Button
} from "@mui/material";

import { useDispatch } from "react-redux";

import { setAuth } from "../store/authSlice";


const clientId = "4f474f7b56eb4f5783bc0b2f187d8eda";
const clientSecret = "296b0e7d63314ed9bab2e6fd8b2a34e5";
const redirectUri = "http://localhost:3000/Streamusic/callback";

const LoginDialog = ({ open, handleClose }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("spotifyAccessToken") || "");
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("spotifyRefreshToken") || "");
    const dispatch = useDispatch();
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-read-private user-read-email playlist-read-private user-library-read`;

    // Function to exchange code for access token
    const fetchAccessToken = async (code) => {
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`)
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: redirectUri
                }),
            });

            const data = await response.json();

            if (data.access_token) {
                setAccessToken(data.access_token);
                setRefreshToken(data.refresh_token);

                localStorage.setItem("spotifyAccessToken", data.access_token);
                localStorage.setItem("spotifyRefreshToken", data.refresh_token);
                localStorage.setItem("spotifyExpiresAt", Date.now() + data.expires_in * 1000);
                dispatch(setAuth({ userauth: true }));

                handleClose();
            }
        } catch (error) {
            console.error("Error fetching access token:", error);
        }
    };

    // Function to refresh access token
    const refreshAccessToken = async () => {
        if (!refreshToken) return;
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`)
                },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: refreshToken,
                }),
            });

            const data = await response.json();
            console.log("New Access Token:", data.access_token);

            if (data.access_token) {
                setAccessToken(data.access_token);
                localStorage.setItem("spotifyAccessToken", data.access_token);
                localStorage.setItem("spotifyExpiresAt", Date.now() + data.expires_in * 1000);
            }
        } catch (error) {
            console.error("Error refreshing access token:", error);
        }
    };

    // Check for authorization code in URL and fetch token
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");

        if (authCode && !accessToken) {
            fetchAccessToken(authCode);
        }
    }, []);

    // Handle Spotify login button click
    const handleSpotifyLogin = () => {
        window.location.href = spotifyAuthUrl;
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" label="Email" type="email" fullWidth />
                <TextField margin="dense" label="Password" type="password" fullWidth />
                <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Button variant="contained" color="success" onClick={handleSpotifyLogin}>
                        Sign in with Spotify
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;
