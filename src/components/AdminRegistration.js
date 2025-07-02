import axios from "axios";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Container,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber } from "@mui/material/colors";
const AdminRegisterWithOtp = () => {
  const [form, setForm] = useState({ email: "", fullName: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const [snackbarKey, setSnackbarKey] = React.useState(0);
  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
  }));

  const Register = async () => {
    try {
      setError("");
      const response = await axios.post(
        `${process.env.REACT_APP_BackEnd}/admin/registration`,
        {
          name: form.fullName,
          mail: form.email,
          password: form.password,
        }
      );

      if (response.status === 201 || response.status === 200) {
        setError("Registration successful!");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status; // e.g., 400 or 500
        const data = error.response.data; // e.g., { error: "Admin already registered" }

        if (status === 400) {
          setError(data.error); // Show the message from your backend
        } else if (status === 500) {
          setError(data.error); // "Error Registering Admin"
        } else {
          setError("Something unexpected happened.");
        }
      } else if (error.request) {
        // No response received from the server (e.g., network error)
        setError("No response from the server. Check your internet.");
      } else {
        // Something else went wrong in setting up the request
        setError("Request setup error.");
      }
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    if (!form.email) return setError("Please enter your email.");
    setOpen(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BackEnd}/admin/registration/send-otp`,
        { mail: form.email }
      );
      if (response.status === 200) {
        // alert("OTP Sent!");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    setSnackbarKey((prev) => prev + 1); // change key to force reopen
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BackEnd}/admin/registration/verify-otp`,
        { otp: otp, email: form.email } // include email if backend uses it
      );

      // Assuming your backend responds with status 200 on success
      if (response.status === 200) {
        setError("OTP Verified!");
        setOpen(false);
        setStep(2);
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setError("Incorrect OTP. Try again.");
    }
  };
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
    <ThemeProvider theme={theme}>
      <Container backgroundColor="secondary.light" color="secondary.white">
        <Box p={4} mt={3} mb={3} color="secondary.white">
          {error && (
            <Box sx={{ mb: 3 }}>
              <Alert severity="info" snackbarKey={snackbarKey}>
                {error}
              </Alert>
            </Box>
          )}
          <Typography variant="h5" mb={2}>
            Admin Registration
          </Typography>

          <TextField
            label="Full Name"
            fullWidth
            name="fullName"
            margin="normal"
            value={form.fullName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            fullWidth
            name="email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={sendOtp}
            sx={{ mt: 1, mb: 2 }}
            disabled={form.fullName === "" || form.email === ""}
          >
            Verify Email
          </Button>
          {open && (
            <Box>
              <Alert severity="success" sx={{ mb: 3 }}>
                {open && form.email && `Enter OTP sent to your ${form.email}`}
              </Alert>

              <Box onClose={() => setOpen(false)} display="flex">
                <TextField
                  fullWidth
                  label="OTP"
                  value={otp}
                  sx={{ width: "250px", mr: 4 }}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={verifyOtp}
                  width="200px"
                  height="150px"
                >
                  Verify OTP
                </Button>
              </Box>
            </Box>
          )}

          <TextField
            label="Password"
            fullWidth
            name="password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={step !== 2}
            onClick={Register}
          >
            Register
          </Button>
        </Box>

        <Stack direction="row" spacing={2}>
          <DemoPaper square={false}>rounded corners</DemoPaper>
          <DemoPaper square>square corners</DemoPaper>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default AdminRegisterWithOtp;
