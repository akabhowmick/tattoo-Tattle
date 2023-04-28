import React from "react";
import { Typography, Box } from "@mui/material";
import { useAuthContext } from "../../providers/auth-provider";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  backgroundColor: "white",
  color: "black",
  border: "none",
  borderRadius: "10px"
};

export const ClientProfile = () => {
  const { user } = useAuthContext();
  const { firstName, lastName, email, phoneNumber } = user;
  return (
    <div>
      <Box sx={style} component="form" noValidate>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          User Profile:
        </Typography>
        <Typography variant="h6" component="h4">
          Name: {firstName + " " + lastName}
        </Typography>
        <Typography variant="h6" component="h4">
          Email: {email}
        </Typography>
        <Typography variant="h6" component="h4">
          Phone: {phoneNumber}
        </Typography>
      </Box>
    </div>
  );
};

export const ArtistProfile = () => {
  const { user } = useAuthContext();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    tattooStyles,
    statesLocation,
  } = user;
  return (
    <div>
      <Box sx={style} component="form" noValidate>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          User Profile:
        </Typography>
        <Typography variant="h6" component="h4">
          Name: {firstName + " " + lastName}
        </Typography>
        <Typography variant="h6" component="h4">
          Email: {email}
        </Typography>
        <Typography variant="h6" component="h4">
          Phone: {phoneNumber}
        </Typography>
        <Typography variant="h6" component="h4">
          Working in: {statesLocation}
        </Typography>
        <Typography variant="h6" component="h4">
          Working in: {tattooStyles}
        </Typography>
      </Box>
    </div>
  );
};
