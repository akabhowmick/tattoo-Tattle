/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Grid,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { MuiTelInput } from "mui-tel-input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signupImage from "../../assets/signup.jpg";
import { useAuthContext } from "../../providers/auth-provider";
import { tattooStyles, usStates } from "../../api/config";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectField, theme) {
  return {
    fontWeight:
      selectField.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const errorStyle = {
  color: "red",
  fontSize: "12px",
  margin: "10px auto",
};

const theme = createTheme();

export const CreateAccount = () => {
  const { addClient, addArtist, userType, setUserType, loggedIn } =
    useAuthContext();

  const [formValues, setFormValues] = useState({
    firstNameInput: {
      data: "",
      valid: false,
      errorMessage: "",
    },
    lastNameInput: {
      data: "",
      valid: false,
      errorMessage: "",
    },
    emailInput: {
      data: "",
      valid: false,
      errorMessage: "",
    },
    phoneInput: {
      data: "",
      valid: false,
      errorMessage: "",
    },
    passwordInput: {
      data: "",
      valid: false,
      errorMessage: "",
    },
    tattooStyleInput: {
      data: [],
      valid: false,
      errorMessage: "",
    },
    statesInput: {
      data: [],
      valid: false,
      errorMessage: "",
    },
  });

  const [toastMessage, setToastMessage] = React.useState({
    message: "",
    messageType: "",
  });

  const nameValidation = (fieldName, value) => {
    if (value.length > 1) {
      setFormValues({
        ...formValues,
        [fieldName]: {
          data: value,
          valid: true,
          errorMessage: "",
        },
      });
    } else {
      setFormValues({
        ...formValues,
        [fieldName]: {
          data: value,
          valid: false,
          errorMessage: "Invalid name",
        },
      });
    }
  };

  const phoneValidation = (newPhone) => {
    // assumes american number, includes +1 and spaces in the format +1 xxx xxx xxxx
    if (newPhone.length === 15) {
      setFormValues({
        ...formValues,
        phoneInput: {
          data: newPhone,
          valid: true,
          errorMessage: "",
        },
      });
    } else {
      setFormValues({
        ...formValues,
        phoneInput: {
          data: newPhone,
          valid: false,
          errorMessage: "Invalid phone number",
        },
      });
    }
  };

  const emailValidation = (email) => {
    const emailRegex =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    emailRegex.test(email)
      ? setFormValues({
          ...formValues,
          emailInput: {
            data: email,
            valid: true,
            errorMessage: "",
          },
        })
      : setFormValues({
          ...formValues,
          emailInput: {
            data: email,
            valid: false,
            errorMessage: "Invalid email input",
          },
        });
  };

  const passwordValidation = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;
    passwordRegex.test(password)
      ? setFormValues({
          ...formValues,
          passwordInput: {
            data: password,
            valid: true,
            errorMessage: "",
          },
        })
      : setFormValues({
          ...formValues,
          passwordInput: {
            data: password,
            valid: false,
            errorMessage:
              "Invalid password input, must have (8-20 char, 1 lowercase,1 uppercase, 1 number, 1 special char)",
          },
        });
  };

  const handleTattooStyleChange = (event) => {
    if (event.target.value.length === 0) {
      setFormValues({
        ...formValues,
        tattooStyleInput: {
          data:
            typeof value === "string"
              ? event.target.value.split(",")
              : event.target.value,
          valid: false,
          errorMessage: "Enter a tattoo style",
        },
      });
    } else {
      setFormValues({
        ...formValues,
        tattooStyleInput: {
          data:
            typeof value === "string"
              ? event.target.value.split(",")
              : event.target.value,
          valid: true,
          errorMessage: "",
        },
      });
    }
  };

  const handleUsStatesChange = (event) => {
    if (event.target.value.length === 0) {
      setFormValues({
        ...formValues,
        statesInput: {
          data:
            typeof value === "string"
              ? event.target.value.split(",")
              : event.target.value,
          valid: false,
          errorMessage: "Enter studio locations",
        },
      });
    } else {
      setFormValues({
        ...formValues,
        statesInput: {
          data:
            typeof value === "string"
              ? event.target.value.split(",")
              : event.target.value,
          valid: true,
          errorMessage: "",
        },
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formValues.firstNameInput.valid &&
      formValues.lastNameInput.valid &&
      formValues.emailInput.valid &&
      formValues.passwordInput.valid &&
      formValues.phoneInput.valid
    ) {
      const user = {
        firstName: formValues.firstNameInput.data,
        lastName: formValues.lastNameInput.data,
        email: formValues.emailInput.data,
        password: formValues.passwordInput.data,
        phoneNumber: formValues.phoneInput.data,
      };
      if (userType === "client") {
        addClient(user);
      } else if (
        userType === "artist" &&
        formValues.statesInput.valid &&
        formValues.tattooStyleInput.valid
      ) {
        user.statesInput = formValues.statesInput.data;
        user.tattooStyleInput = formValues.tattooStyleInput.data;
        addArtist(user);
      }
      else{
        setToastMessage({ message: "Sign up", messageType: "error" });
      }
    } else{
      setToastMessage({ message: "Sign up", messageType: "error" });
    }
  };

  return (
    <div className="create-account">
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
              backgroundImage: `url(${signupImage})`,
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
                      onChange={() => setUserType(event.target.value)}
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
                <Grid container spacing={2}>
                  <div className="field-error-div">
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={(e) => {
                          nameValidation("firstNameInput", e.target.value);
                        }}
                        sx={{ width: 150 }}
                      />
                    </Grid>
                    {!formValues.firstNameInput.valid && (
                      <Typography sx={errorStyle} variant="h6" component="h6">
                        {formValues.firstNameInput.errorMessage}
                      </Typography>
                    )}
                  </div>

                  <div className="field-error-div">
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={(e) => {
                          nameValidation("lastNameInput", e.target.value);
                        }}
                        sx={{ width: 150 }}
                      />
                    </Grid>
                    {!formValues.lastNameInput.valid && (
                      <Typography sx={errorStyle} variant="h6" component="h6">
                        {formValues.lastNameInput.errorMessage}
                      </Typography>
                    )}
                  </div>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => {
                        emailValidation(e.target.value);
                      }}
                    />
                  </Grid>
                  {!formValues.emailInput.valid && (
                    <Typography sx={errorStyle} variant="h6" component="h6">
                      {formValues.emailInput.errorMessage}
                    </Typography>
                  )}

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => {
                        passwordValidation(e.target.value);
                      }}
                    />
                  </Grid>
                  {!formValues.passwordInput.valid && (
                    <Typography sx={errorStyle} variant="h6" component="h6">
                      {formValues.passwordInput.errorMessage}
                    </Typography>
                  )}

                  <Grid item xs={12}>
                    <MuiTelInput
                      fullWidth
                      value={formValues.phoneInput.data}
                      onChange={phoneValidation}
                      forceCallingCode
                      preferredCountries={["US"]}
                      defaultCountry={"US"}
                    />
                  </Grid>
                  {!formValues.phoneInput.valid && (
                    <Typography sx={errorStyle} variant="h6" component="h6">
                      {formValues.phoneInput.errorMessage}
                    </Typography>
                  )}

                  {userType === "artist" && (
                    <div className="artist-add-ons">
                      <Grid container spacing={2}>
                        <div className="field-error-div">
                          <Grid item xs={12}>
                            <FormControl sx={{ m: 2, width: 120 }}>
                              <InputLabel id="demo-multiple-chip-label">
                                Location
                              </InputLabel>
                              <Select
                                required
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={formValues.statesInput.data}
                                onChange={handleUsStatesChange}
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="States of Operation"
                                  />
                                }
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
                                MenuProps={MenuProps}
                              >
                                {usStates.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(
                                      name,
                                      formValues.statesInput.data,
                                      theme
                                    )}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          {!formValues.statesInput.valid && (
                            <Typography
                              sx={errorStyle}
                              variant="h6"
                              component="h6"
                            >
                              {formValues.statesInput.errorMessage}
                            </Typography>
                          )}
                        </div>
                        <div className="field-error-div">
                          <Grid item xs={12}>
                            <FormControl sx={{ m: 2, width: 200 }}>
                              <InputLabel>Tattoo Style(s)</InputLabel>
                              <Select
                                required
                                labelId="demo-multiple-chip-label"
                                multiple
                                value={formValues.tattooStyleInput.data}
                                onChange={handleTattooStyleChange}
                                input={
                                  <OutlinedInput label="Tattoo Style(s)" />
                                }
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
                                MenuProps={MenuProps}
                              >
                                {tattooStyles.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(
                                      name,
                                      formValues.tattooStyleInput.data,
                                      theme
                                    )}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          {!formValues.tattooStyleInput.valid && (
                            <Typography
                              sx={errorStyle}
                              variant="h6"
                              component="h6"
                            >
                              {formValues.tattooStyleInput.errorMessage}
                            </Typography>
                          )}
                        </div>
                      </Grid>
                    </div>
                  )}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create an Account!
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/" replace={true}>
                      Already have an account? Log in Now!
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};
