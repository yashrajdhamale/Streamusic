import * as React from "react";
import {
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Alert,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const providers = [{ id: "credentials", name: "Email and Password" }];

function CustomEmailField({ EmailRef }) {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      inputRef={EmailRef}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField({ PasswordRef }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        inputRef={PasswordRef}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton({ EmailRef, PasswordRef, setLoginStatus }) {
  const AdminLogin = async () => {
    const email = EmailRef.current.value;
    const password = PasswordRef.current.value;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BackEnd}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ mail: email, password }),
        }
      );
      const data = await response.json();

      if (response.status === 400) {
        setLoginStatus("notfound");
      } else if (response.ok) {
        setLoginStatus("success");
        setTimeout(() => {
          window.location.href = "/Streamusic"; // redirect after short delay
        }, 1000);
      } else {
        setLoginStatus("error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginStatus("exception");
    }
  };

  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
      onClick={AdminLogin}
    >
      Log In
    </Button>
  );
}

function SignUpLink() {
  const navigate = useNavigate();
  const signup = () => {
    navigate("/Streamusic/admin-registration");
  };
  return (
    <Link onClick={signup} variant="body2">
      Sign up
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

function Title() {
  return <h2 style={{ marginBottom: 8 }}>Login</h2>;
}

function Subtitle({ loginStatus }) {
  if (loginStatus === "success") {
    return (
      <Alert severity="success" sx={{ mb: 2, px: 1, py: 0.25 }}>
        Login successful!
      </Alert>
    );
  } else if (loginStatus === "notfound") {
    return (
      <Alert severity="error" sx={{ mb: 2, px: 1, py: 0.25 }}>
        User not found.
      </Alert>
    );
  } else if (loginStatus === "error") {
    return (
      <Alert severity="error" sx={{ mb: 2, px: 1, py: 0.25 }}>
        Invalid credentials.
      </Alert>
    );
  } else if (loginStatus === "exception") {
    return (
      <Alert severity="warning" sx={{ mb: 2, px: 1, py: 0.25 }}>
        An error occurred. Please try again.
      </Alert>
    );
  } else {
    return null; // nothing shown initially
  }
}

function RememberMeCheckbox() {
  const theme = useTheme();
  return (
    <FormControlLabel
      label="Remember me"
      control={
        <Checkbox
          name="remember"
          value="true"
          color="primary"
          sx={{ padding: 0.5, "& .MuiSvgIcon-root": { fontSize: 20 } }}
        />
      }
      slotProps={{
        typography: {
          color: "textSecondary",
          fontSize: theme.typography.pxToRem(14),
        },
      }}
    />
  );
}

export default function SlotsSignIn() {
  const theme = useTheme();
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);
  const [loginStatus, setLoginStatus] = useState(null); // can be: "success", "error", "notfound", etc.

  return (
    <AppProvider theme={theme}>
      <SignInPage
        // signIn={(provider, formData) =>
        //   alert(
        //     `Logging in with "${provider.name}" and credentials: ${formData.get("email")}, ${formData.get("password")}, and checkbox value: ${formData.get("remember")}`
        //   )
        // }
        slots={{
          // expects a fuction/react componet to be passed
          title: Title,
          subtitle: () => <Subtitle loginStatus={loginStatus} />,
          emailField: (props) => (
            <CustomEmailField EmailRef={EmailRef} {...props} /> //{...props} sends all the old and new props
          ),
          passwordField: (props) => (
            <CustomPasswordField PasswordRef={PasswordRef} {...props} />
          ),
          submitButton: (props) => (
            <CustomButton
              EmailRef={EmailRef}
              PasswordRef={PasswordRef}
              setLoginStatus={setLoginStatus}
              {...props}
            />
          ),
          signUpLink: SignUpLink, //SignUpLink is a function
          rememberMe: RememberMeCheckbox,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        slotProps={{ form: { noValidate: true } }}
        providers={providers}
      />
    </AppProvider>
  );
}
