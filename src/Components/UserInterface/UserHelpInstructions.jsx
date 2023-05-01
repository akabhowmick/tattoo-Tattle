import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(name, calories) {
  return { name, calories };
}

const clientRows = [
  createData("Account Dashboard", "View or update your profile/logout"),
  createData("My favorites", "View your favorites"),
  createData("My Requests", "View your requests"),
  createData("+", "Add a request for the tattoo"),
  createData("Heart Emoji", "Add or remove from favorites"),
];

const artistRows = [
  createData("Account Dashboard", "View or update your profile/logout"),
  createData("Your Tattoos", "View your tattoos"),
  createData(
    "My Requests",
    "View your requests, which you can then approve or deny"
  ),
  createData("Add tattoo", "Add a tattoo"),
  createData("+", "Edit your tattoo"),
  createData("-", "Delete your tattoo"),
];

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
  maxHeight: "50%",
  overflowX: "auto",
};

export const UserHelpInstructions = () => {
  return (
    <Box sx={style} component="form" noValidate>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Welcome to Tattoo Tattle:
      </Typography>
      <Typography
        sx={{ margin: "12px 0", textDecoration: "underline" }}
        variant="h6"
        component="h3"
      >
        If you are a client:
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell align="left">Usage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        sx={{ margin: "12px 0", textDecoration: "underline" }}
        variant="h6"
        component="h3"
      >
        If you are an artist:
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell align="left">Usage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artistRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" sx={{ marginTop: "12px" }} component="h2">
        Enjoy your tattoo tattle experience!
      </Typography>
    </Box>
  );
};
