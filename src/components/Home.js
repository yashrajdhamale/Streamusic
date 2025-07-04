// import React from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI Core
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { amber } from "@mui/material/colors";

// MUI Theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

// Custom Component
import HomeCard from "./HomeAccordian";
import HomeCarousel from "./HomeCarousel";
// If you're using Typography from @mui/joy (optional)
import Typography from "@mui/material/Typography";

const Home = () => {
  const Navigate = useNavigate();

  const theme = createTheme({
    palette: {
      amber: {
        main: amber[800], // or another shade like amber[700]
        contrastText: "#fff", // optional
      },
      secondary: {
        main: "#E0C2FF",
        light: "#82b1ff",
        white: "white",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#47008F",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", mt: "55px" }}>
          <Stack spacing={2} width="100%">
            <Box
              component="section"
              sx={{
                minHeight: "65vh",
                width: "100%",
                display: "flex",
                alignItems: "top",
                justifyContent: "center",
                textAlign: "center",
                pb: 10
              }}
              backgroundColor="#d1d1f7"
            >
              <Stack
                spacing={2}
                sx={{
                  top: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  p: 2,
                }}
              >
                <Typography
                  level="h6"
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "3rem", md: "4rem" },
                    fontWeight: "bold",
                  }}
                  color="#2b1c50"
                >
                  Your ultimate space for music discovery and streaming
                </Typography>

                <Typography
                  level="h4"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.5rem", md: "1.8rem" },
                  }}
                  color="#3d2e7c"
                >
                  Let the Crowd Choose the Beat
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="solid"
                    color="primary"
                    size="small"
                    sx={{
                      mt: 1,
                      borderRadius: "30px",
                      px: 4,
                      fontWeight: "bold",
                      backgroundColor: "#4b42ae",
                      color: "#fff",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.3s ease",
                      boxShadow: "lg",
                      maxWidth: "200px",
                    }}
                    onClick={() => {
                      Navigate("/Streamusic/admin-login");
                    }}
                  >
                    Host Music Session
                  </Button>
                  <Button
                    variant="solid"
                    color="primary"
                    size="small"
                    sx={{
                      mt: 1,
                      borderRadius: "30px",
                      px: 4,
                      fontWeight: "bold",
                      backgroundColor: "#fff",
                      color: "#565add",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.3s ease",
                      boxShadow: "lg",
                      maxWidth: "200px",
                    }}
                    onClick={() => {
                      Navigate("/Streamusic/user-login");
                    }}
                  >
                    Connect & Join Room
                  </Button>
                </Box>
                <Box
                  component="section"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  backgroundColor="#d1d1f7"
                >
                  <HomeCarousel />
                </Box>
              </Stack>
            </Box>

            <Divider orientation="horizontal" flexItem />
            <Box
              component="section"
              sx={{
                p: 4,
                height: "660px",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  background: "#2b1c50",
                  width: "100%",
                  borderRadius: "8%",
                  height: "100%",
                  color: "white",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                   
                }}
              >
                <Typography
                  level="h2"
                  sx={{
                    fontSize: { xs: 30, sm: 40, md: 50 },
                    "margin-top": 30,
                    textAlign: "left",
                    p: 2,
                  }}
                >
                  Try for free
                </Typography>
                {/* <Typography
                  level="h6"
                  sx={{
                    fontSize: { xs: 10, sm: 10, md: 20 },
                    textAlign: "left",
                    width: "100%",
                    pl: 2,
                    mt: 2,
                    mb: 5,
                  }}
                >
                  Revolutionize group music experiences with smart,
                  collaborative playlists!
                </Typography> */}
                <Typography
                  level="h6"
                  sx={{
                    fontSize: { xs: 16, sm: 20, md: 40 },
                    textAlign: "left",
                  }}
                >
                  <img src="" />
                </Typography>
              </Box>
            </Box>
            <Box
              component="section"
              sx={{
                p: 2,
                height: "660px",
              }}
            >
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: 30, sm: 40, md: 50 },
                  "margin-top": 30,
                  textAlign: "left",
                  p: 2,
                }}
              >
                How It Works
              </Typography>
              <Typography
                level="h6"
                sx={{
                  fontSize: { xs: 10, sm: 10, md: 20 },
                  textAlign: "left",
                  width: "100%",
                  pl: 2,
                  mt: 2,
                  mb: 5,
                }}
              >
                Revolutionize group music experiences with smart, collaborative
                playlists!
              </Typography>
              <Typography
                level="h6"
                sx={{
                  fontSize: { xs: 16, sm: 20, md: 40 },
                  textAlign: "left",
                }}
              >
                <img src="" />
              </Typography>
            </Box>
            <Box
              component="section"
              sx={{
                p: 2,
                height: "660px",
              }}
            >
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: 30, sm: 40, md: 50 },
                  "margin-top": 30,
                  textAlign: "left",
                  p: 2,
                }}
              >
                FAQs
              </Typography>
              <Typography
                level="h6"
                sx={{
                  fontSize: { xs: 10, sm: 10, md: 20 },
                  textAlign: "left",
                  width: "100%",
                  pl: 2,
                  mt: 2,
                  mb: 5,
                }}
              >
                Revolutionize group music experiences with smart, collaborative
                playlists!
              </Typography>
              <Typography
                level="h6"
                sx={{
                  fontSize: { xs: 16, sm: 20, md: 40 },
                  textAlign: "left",
                }}
              >
                <HomeCard />
              </Typography>
            </Box>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Home;
