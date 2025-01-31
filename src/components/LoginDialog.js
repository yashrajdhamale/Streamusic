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
import { useSelector } from "react-redux";


const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = "http://localhost:3000/Streamusic/callback";

const LoginDialog = ({ open, handleClose }) => {
    const { UaccessToken } = useSelector((state) => state.userauth);
    const dispatch = useDispatch();
const { userauth } = useSelector((state) => state.userauth); 
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-read-private user-read-email playlist-read-private user-library-read`;

    
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

                localStorage.setItem("spotifyAccessToken", data.access_token);
                localStorage.setItem("spotifyRefreshToken", data.refresh_token);
                localStorage.setItem("spotifyExpiresAt", Date.now() + data.expires_in * 1000);
                localStorage.setItem("logedIn", true);
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
