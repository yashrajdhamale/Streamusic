import React, { useEffect, useState, useCallback } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { setQuery } from "../store/searchQuerySlice.js";
import { setLoading } from "../store/loadingSlice.js";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { setOpen } from "../store/dialogSlice.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import favicon from "../utils/favicon.ico";

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";

import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar({ setSearchResults, setShowQueue, adminLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const searchQuery = useSelector((state) => state.searchQuery.value);
  const { accessToken, expiresAt } = useSelector((state) => state.auth); // using the access token to search the songs
  const { userauth, UaccessToken } = useSelector((state) => state.userauth); // the ans is true or false
  const open = useSelector((state) => state.dialog.open);

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#fff",
        light: "#F5EBFF",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "Black",
      },
    },
  });
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BackEnd}/admin/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response); // ✅ This will now log the response

      if (response.data.success) {
        console.log("Logout successful");

        queryClient.removeQueries(["adminAuth"]);
        window.location.href = "/Streamusic";
        setAnchorEl(null);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };
  const gohome = () => {
    navigate("/Streamusic");
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        color="secondary"
        padding="20px"
        width="auto"
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton edge="start" color="inherit" aria-label="logo">
              <img
                src={favicon} // replace with your image path
                alt="Logo"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  cursor: "pointer",
                }} // customize as neededonClick={gohome}
              />
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 300,
                fontSize: { xs: 13, sm: 14, md: 18 },
                whiteSpace: "nowrap",
                overflow: "visible",
                textOverflow: "clip",
                minWidth: "100px",
                cursor: "pointer",
              }}
              onClick={gohome}
            >
              Streamusic
            </Typography>{" "}
          </Box>

          {adminLogin && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => dispatch(setQuery(e.target.value))}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ border: 1 }}
              />
            </Search>
          )}
          {adminLogin && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              <Button
                variant="text"
                color="white"
                sx={{ padding: 1, minWidth: "auto" }}
              >
                <QueueMusicIcon sx={{ margin: "auto" }} />
              </Button>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <IconButton>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
