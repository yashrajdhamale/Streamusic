import { Box, Typography, Divider, Link } from "@mui/material";
// import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#c7c6f9",
        color: "black",
        py: 4,
        px: { xs: 2, sm: 4, md: 10 },
      }}
    >
      <Grid container spacing={3}>
        {/* About Section */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="h6" gutterBottom>
            Streamusic
          </Typography>
          <Typography variant="body2">
            Let the crowd choose the beat! Collaborative music experience for
            your parties, cafés, or gym.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Grid>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
          </Grid>
          <Grid>
            <Link
              href="/Streamusic"
              color="inherit"
              underline="hover"
              display="block"
            >
              Home
            </Link>
          </Grid>
          <Grid>
            <Link
              href="/Streamusic/admin-login"
              color="black"
              underline="hover"
              display="block"
            >
              Admin Login
            </Link>
          </Grid>
          <Grid>
            <Link
              href="/Streamusic/admin-registration"
              color="inherit"
              underline="hover"
              display="block"
            >
              Register Admin
            </Link>
          </Grid>
        </Grid>

        {/* Contact Info */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body2">
            Email: sarathi062023@gmail.com
          </Typography>
          <Typography variant="body2">Phone: +91 7262924896</Typography>
        </Grid>

      </Grid>

      <Divider sx={{ bgcolor: "#444", my: 8 }} />

      <Typography
        variant="body2"
        align="center"
        color="gray"
      >
        © {new Date().getFullYear()} Streamusic. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
