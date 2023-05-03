/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useTattooTattleContext } from "../../providers/tattoo-provider";
import { ToastMessage } from "../UserInterface/ToastMessage";
import { errorStyle, modalStyles } from "../UserInterface/Styles";

export const EditTattoo = ({ id, handleClose, tattooEditSuccess }) => {
  const { updateTattoo } = useTattooTattleContext();
  const [messageBody, setMessageBody] = useState("");
  const [validMessage, setValidMessage] = useState("Enter a description");
  const [tattooTitle, setTattooTitle] = useState("");
  const [validTitle, setValidTitle] = useState("Enter a title");
  const [toastMessage, setToastMessage] = useState({
    message: "",
    messageType: "",
  });

  const messageBodyValidation = (message) => {
    if (!messageBody || message.length < 20) {
      setValidMessage("Invalid: enter a description (>20 char)");
    } else {
      setValidMessage("true");
    }
    setMessageBody(message);
  };

  const titleValidation = (title) => {
    if (!tattooTitle || title.length < 5) {
      setValidTitle("Invalid: enter a title");
    } else {
      setValidTitle("true");
    }
    setTattooTitle(title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const info =
    validTitle === "true" && validMessage === "true"
        ? {
            message: "Tattoo details modified",
            messageType: "success",
          }
        : {
            message: "Tattoo Not Modified",
            messageType: "error",
          };
    if (validTitle === "true" && validMessage === "true") {
      updateTattoo(id, tattooTitle, messageBody);
      handleClose();
      tattooEditSuccess(info);
    } 
    setToastMessage(info);
  };

  return (
    <div>
      <Box sx={modalStyles} component="form" noValidate onSubmit={handleSubmit}>
        <Typography
          id="modal-modal-title"
          style={{ color: "black" }}
          variant="h6"
          component="h2"
        >
          Update Tattoo Details
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="tattoo-title"
          label="Tattoo Title"
          type="text"
          id="tattoo-title"
          autoComplete="Tattoo Title"
          autoFocus
          onChange={(e) => {
            titleValidation(e.target.value);
          }}
        />
        {validTitle !== "true" && (
          <Typography sx={errorStyle} variant="h6" component="h6">
            {validTitle}
          </Typography>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          name="tattoo-description"
          label="Tattoo Description"
          type="text"
          id="tattoo-description"
          autoComplete="Tattoo Description"
          autoFocus
          onChange={(e) => {
            messageBodyValidation(e.target.value);
          }}
        />
        {validMessage !== "true" && (
          <Typography sx={errorStyle} variant="h6" component="h6">
            {validMessage}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit Request
        </Button>
      </Box>
      {toastMessage.message !== "" && <ToastMessage info={toastMessage} />}
    </div>
  );
};
