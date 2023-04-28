/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useRequestsContext } from "../../providers/requests-provider";
import { useAuthContext } from "../../providers/auth-provider";
import { useTattooTattleContext } from "../../providers/tattoo-provider";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "white",
  color: "black",
};
const errorStyle = {
  color: "red",
  fontSize: "12px",
};

export const CreateRequest = ({ tattoo, handleClose }) => {
  const { user } = useAuthContext();
  const { activeSelectorClick } = useTattooTattleContext();
  const { addRequest } = useRequestsContext();
  const [messageBody, setMessageBody] = useState("");
  const [validMessage, setValidMessage] = useState("Enter a message");

  const messageBodyValidation = (message) => {
    if (!messageBody || message.length < 20) {
      setValidMessage("Invalid: enter a description (>20 char)");
    } else {
      setValidMessage("true");
    }
    setMessageBody(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validMessage === "true") {
      const newRequest = {
        messageBody: messageBody,
        approvalStatus: "Pending",
        clientName: user.firstName + " " + user.lastName,
        clientId: user.id,
        artistName: tattoo.artist,
        artistId: tattoo.artistId,
        tattooOfInterestTitle: tattoo.title,
      };
      addRequest(newRequest);
      activeSelectorClick("reqs", user.id);
      handleClose();
    }
  };

  return (
    <div>
      <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Inquire Artist about Design
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="messageBody"
          label="Message Body"
          type="text"
          id="messageBody"
          autoComplete="message for artist"
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
    </div>
  );
};
