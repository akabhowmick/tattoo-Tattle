/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useAuthContext } from "../../providers/auth-provider";
import { Typography, Box, TextField, Button } from "@mui/material";
import { showToastMessage, ToastMessage } from "../UserInterface/ToastMessage";
import { errorStyle, modalStyles } from "../UserInterface/Styles";

export const AccountEdits = ({ handleAccountEditClose }) => {
  const { editUser } = useAuthContext();
  const [emailInput, setEmailInput] = useState("");
  const [validEmail, setValidEmail] = useState("Enter a valid email");
  const [passwordInput, setPasswordInput] = useState("");
  const [validPassword, setValidPassword] = useState(
    "Enter valid password (8-20 char, 1 lowercase,1 uppercase, 1 number, 1 special char)"
  );
  const [toastMessage, setToastMessage] = useState({
    message: "",
    messageType: "",
  });

  const emailValidation = (email) => {
    if (!emailInput) {
      setValidEmail("Invalid entry: email input is empty");
    } else {
      const emailRegex =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      emailRegex.test(email)
        ? setValidEmail("true")
        : setValidEmail("Invalid email input");
    }
    setEmailInput(email);
  };

  const passwordValidation = (password) => {
    if (!validPassword) {
      setValidPassword("Invalid entry: password input is empty");
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;
      passwordRegex.test(password)
        ? setValidPassword("true")
        : setValidPassword(
            "Invalid password input, must have (8-20 char, 1 lowercase,1 uppercase, 1 number, 1 special char)"
          );
    }
    setPasswordInput(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const info =
      validPassword === "true" && validEmail === "true"
        ? {
            message: "User details modified",
            messageType: "success",
          }
        : {
            message: "Account Not Modified",
            messageType: "error",
          };
    if (validPassword === "true" && validEmail === "true") {
      editUser(emailInput, passwordInput);
      showToastMessage(info);
      handleAccountEditClose(info);
    }
    setToastMessage(info);
  };

  return (
    <div>
      <Box sx={modalStyles} component="form" noValidate onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Make changes to profile!
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          onChange={(e) => {
            emailValidation(e.target.value);
          }}
          autoComplete="new-password"
        />
        {validEmail !== "true" && (
          <Typography sx={errorStyle} variant="h6" component="h6">
            {validEmail}
          </Typography>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={(e) => {
            passwordValidation(e.target.value);
          }}
          autoComplete="new-password"
        />
        {validPassword !== "true" && (
          <Typography sx={errorStyle} variant="h6" component="h6">
            {validPassword}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Edit Account
        </Button>
      </Box>
      {toastMessage.message !== "" && <ToastMessage info={toastMessage} />}
    </div>
  );
};
