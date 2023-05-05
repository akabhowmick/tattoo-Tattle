/* eslint-disable react/prop-types */
import React from "react";
import { Typography, Box } from "@mui/material";
import { modalStyles } from "../UserInterface/Styles";

export const TattooInfo = ({tattoo}) => {
  const {
    title,
    artist,
    description,
    dateCreated,
    price,
    statesInput,
    tattooStyleInput,
  } = tattoo;

  const priceDescription =
    price === 1001
      ? "Over $1000"
      : price === 1000
      ? "Between $500 and $1000"
      : price === 500
      ? "Between $100 and $500"
      : "Less than $100";

  return (
    <div>
      <Box sx={modalStyles} component="form" noValidate>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Full Tattoo Details
        </Typography>
        <Typography paragraph>
          <strong>Tattoo Title: </strong>
          {title}
        </Typography>
        <Typography paragraph>
          <strong>Artist: </strong>
          {artist}
        </Typography>
        <Typography paragraph>
          <strong>Tattoo Style: </strong>
          {tattooStyleInput?.toString()}
        </Typography>
        <Typography paragraph>
          <strong>Description: </strong>
          {description}
        </Typography>
        <Typography paragraph>
          <strong>Design date: </strong>
          {dateCreated}
        </Typography>
        <Typography paragraph>
          <strong>Where can you get this:</strong> {statesInput?.toString()}
        </Typography>
        <Typography paragraph>
          <strong>Price Range: </strong>
          {priceDescription}
        </Typography>
      </Box>
    </div>
  );
};
