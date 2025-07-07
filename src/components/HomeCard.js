import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

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
const bull = (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      mx: "2px",
      transform: "scale(0.8)",
    }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Grid container spacing={6}>
      <Grid>
        <Card
          variant="outlined"
          sx={{
            width: 250,
            height: 300,
            borderRadius: "30px",
            border: "black",
            p: 2,
            background: "#e8f5e3",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              borderColor: "transparent",
            },
          }}
        >
          <React.Fragment>
            <CardContent>
              <Typography variant="h6" component="div">
                What is Personalized Music?
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                  maxWidth: 200, // or any width that fits your layout
                  textAlign: "left", // or "justify" if you want even text edges
                  lineHeight: 1.6,
                  mt: 1,
                }}
              >
                Log in with Spotify to get song suggestions tailored to your
                taste. No more random songs — just your vibe.
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      </Grid>
      <Grid>
        <Card
          variant="outlined"
          sx={{
            width: 250,
            height: 300,
            borderRadius: "30px",
            border: "black",
            p: 2,
            background: "#f8edfb",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              borderColor: "transparent",
            },
          }}
        >
          <React.Fragment>
            <CardContent>
              <Typography variant="h6" component="div">
                What is the Collaborative Queue?
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                  maxWidth: 200, // or any width that fits your layout
                  textAlign: "left", // or "justify" if you want even text edges
                  lineHeight: 1.6,
                  mt: 1,
                }}
              >
                Everyone can add their favorite tracks to a shared queue —
                perfect for parties, gyms, or trips.
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      </Grid>
      <Grid>
        <Card
          variant="outlined"
          sx={{
            width: 250,
            height: 300,
            borderRadius: "30px",
            border: "black",
            p: 2,
            background: "#dbf0ff",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              borderColor: "transparent",
            },
          }}
        >
          <React.Fragment>
            <CardContent>
              <Typography variant="h6" component="div">
                What does Admin Control mean?
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                  maxWidth: 200, // or any width that fits your layout
                  textAlign: "left", // or "justify" if you want even text edges
                  lineHeight: 1.6,
                  mt: 1,
                }}
              >
                Admins can manage the queue: approve, skip, or reorder songs to
                keep the mood just right.
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      </Grid>
      <Grid>
        <Card
          variant="outlined"
          sx={{
            width: 250,
            height: 300,
            borderRadius: "30px",
            border: "black",
            p: 2,
            background: "#f0f1ff",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              borderColor: "transparent",
            },
          }}
        >
          <React.Fragment>
            <CardContent>
              <Typography variant="h6" component="div">
                Where can I use Streamusic?
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                  maxWidth: 200, // or any width that fits your layout
                  textAlign: "left", // or "justify" if you want even text edges
                  lineHeight: 1.6,
                  mt: 1,
                }}
              >
                House parties, workouts, cafés, road trips — Streamusic adapts
                to any group music experience.
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      </Grid>
    </Grid>
  );
}
