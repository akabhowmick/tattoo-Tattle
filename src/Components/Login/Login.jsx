import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import loginImage from "../../assets/login.png";
import { useAuthContext } from "../../providers/auth-provider";
import { Navigate, Link } from "react-router-dom";
import { ToastMessage } from "../UserInterface/ToastMessage";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/" replace={true}>
        Tattoo Tattle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export const Login = () => {
  const { userType, setUserType, signInArtist, signInClient, loggedIn } =
    useAuthContext();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [toastMessage, setToastMessage] = React.useState({
    message: "",
    messageType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (userType === "client") {
      const client = {
        email: emailInput,
        password: passwordInput,
      };
      result = await signInClient(client);
    } else {
      const artist = {
        email: emailInput,
        password: passwordInput,
      };
      result = await signInArtist(artist);
    }
    if (!result) {
      setToastMessage({ message: "Log-in", messageType: "error" });
    }
  };

  return (
    <>
      {loggedIn && userType === "client" && (
        <Navigate to="/client-home" replace={true} />
      )}
      {loggedIn && userType === "artist" && (
        <Navigate to="/artist-home" replace={true} />
      )}
      {toastMessage.message !== "" && <ToastMessage info={toastMessage} />}
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${loginImage})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Account Type
                    </FormLabel>
                    <RadioGroup
                      autoFocus
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      defaultValue="client"
                    >
                      <FormControlLabel
                        value="client"
                        control={<Radio />}
                        label="Client"
                      />
                      <FormControlLabel
                        value="artist"
                        control={<Radio />}
                        label="Artist"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/signup" replace={true}>
                      Don&#39;t have an account? Sign up Now!
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
