import axios from "axios";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Modal,
  Typography,
  Alert,
  Container,
} from "@mui/material";
import AdminRegistrationSnackBar from "./AdminRegistrationSnackBar";

const AdminRegisterWithOtp = () => {
  const [form, setForm] = useState({ email: "", fullName: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const [snackbarKey, setSnackbarKey] = React.useState(0);

  const Register = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BackEnd}/admin/registration`,
        {
          name: form.fullName,
          mail: form.email,
          password: form.password,
        }
      );

      if (response.status === 201 || response.status === 200) {
        // success logic
        alert("Registration successful!");
        // optionally navigate or update UI state here
      } else if (response.status === 400) {
        // alert(response.error);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
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
    console.log(snackbarKey);
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

  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 2, p: 3 }}>
        {error && (
          <AdminRegistrationSnackBar
            message={error}
            snackbarKey={snackbarKey}
          />
        )}
      </Box>
      <Box p={4} mt={5} boxShadow={3} borderRadius={2}>
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

      {/* OTP Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          p={4}
          bgcolor="white"
          borderRadius={2}
          boxShadow={4}
          sx={{
            maxWidth: 400,
            mx: "auto",
            mt: "20vh",
          }}
        >
          <Typography variant="h6" mb={2}>
            Enter OTP sent to your email
          </Typography>
          <TextField
            fullWidth
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={verifyOtp}
          >
            Verify OTP
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminRegisterWithOtp;
