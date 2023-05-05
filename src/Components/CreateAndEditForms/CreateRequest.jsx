/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useRequestsContext } from "../../providers/requests-provider";
import { useAuthContext } from "../../providers/auth-provider";
import { ToastMessage } from "../UserInterface/ToastMessage";
import { errorStyle, modalStyles } from "../UserInterface/Styles";

export const CreateRequest = ({
  tattoo,
  handleClose,
  tattooRequestSuccess,
}) => {
  const { user } = useAuthContext();
  const { addRequest } = useRequestsContext();
  const [messageBody, setMessageBody] = useState("");
  const [validMessage, setValidMessage] = useState("Enter a message");
  const [toastMessage, setToastMessage] = useState({
    message: "",
    messageType: "",
  });

  const messageBodyValidation = (message) => {
    setMessageBody(message);
    if (message.length < 20) {
      setValidMessage("Invalid: enter a description (>20 char)");
    } else {
      setValidMessage("true");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const info =
      validMessage === "true"
        ? {
            message: "Request added",
            messageType: "success",
          }
        : {
            message: "Request Not Modified",
            messageType: "error",
          };
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
      tattooRequestSuccess(info);
      handleClose();
    }
    setToastMessage(info);
  };

  return (
    <>
      <div>
        <Box sx={modalStyles} component="form" noValidate onSubmit={handleSubmit}>
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
            value={messageBody}
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
      {toastMessage.message !== "" && <ToastMessage info={toastMessage} />}
    </>
  );
};
