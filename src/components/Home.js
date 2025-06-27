import Nav from "./Navbar";
// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material/Button";
import { amber } from "@mui/material/colors";
import Divider, { dividerClasses } from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomeCard from "./HomeAccordian";
import Footer from "./Footer";
import HomeCarousel from "./HomeCarousel";

const Home = () => {
  const Navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

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
      <Nav />
      <ThemeProvider theme={theme}>
        <Box
          sx={{ width: "100%" }}
          backgroundColor="secondary.light"
          color="secondary.white"
        >
          <Stack spacing={2} width="100%">
            <Box
              component="section"
              position="relative"
              zIndex="1"
              sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {/* <HomeCarousel /> */}
              <Stack
                spacing={3}
                sx={{
                  maxWidth: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  zIndex: 1,
                }}
              >
                <Typography
                  level="h1"
                  sx={{
                    fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                    fontWeight: "bold",
                  }}
                >
                  Welcome to Streamusic
                </Typography>

                <Typography
                  level="h4"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                    color: "white",
                  }}
                >
                  Let the Crowd Choose the Beat 🎵
                </Typography>

                <Box theme={theme} sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="solid"
                    color="primary"
                    size="small"
                    sx={{
                      mt: 2,
                      borderRadius: "30px",
                      px: 4,
                      fontWeight: "bold",
                      backgroundColor: "#fff",
                      color: "#0288d1",
                      "&:hover": {
                        // backgroundColor: "#03a9f4",
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
                      mt: 2,
                      borderRadius: "30px",
                      px: 4,
                      fontWeight: "bold",
                      backgroundColor: "#fff",
                      color: "#0288d1",
                      "&:hover": {
                        // backgroundColor: "#03a9f4",
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
              </Stack>
            </Box>
            <Divider orientation="horizontal" flexItem />
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
      <Footer />
    </>
  );
};
const FeatureCard = ({ title, desc }) => (
  <div className="bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p>{desc}</p>
  </div>
);

export default Home;
