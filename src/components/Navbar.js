import React from "react";

import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import favicon from "../utils/favicon.ico";

import Avatar from "@mui/material/Avatar";

import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

function Navbar({ setSearchResults, setShowQueue, adminLogin }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              <Button
                variant="solid"
                color="primary"
                size="small"
                sx={{
                  borderRadius: "30px",
                  px: 4,
                  fontWeight: "bold",
                  backgroundColor: "#565add",
                  color: "#fff",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                  boxShadow: "lg",
                  maxWidth: "200px",
                  width: "150px",
                  height: "35px",
                  // border: "5px solid #4B42AD",
                }}
                onClick={() => {
                  navigate("Streamusic/dashboard");
                }}
              >
                Dashboard
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
