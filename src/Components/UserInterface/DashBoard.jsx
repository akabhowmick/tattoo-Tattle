import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAuthContext } from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
import { ClientProfile } from "./Profile";
import { AccountEdits } from "../CreateAndEditForms/AccountEdits";
import { ToastMessage } from "./ToastMessage";
import { UserHelpInstructions } from "./UserHelpInstructions";

export const DashBoard = () => {
  const { user, setUser, setLoggedIn } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openHelp, setOpenHelp] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openAccountEdit, setOpenAccountEdit] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState({
    message: "",
    messageType: "",
  });

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setUser(null);
    setLoggedIn(false);
  };

  const handleHelpOpen = () => {
    setOpenHelp(true);
  };

  const profileClick = () => {
    setOpenProfile(true);
  };

  const accountEditsClick = () => {
    setOpenAccountEdit(true);
  };

  const handleHelpClose = () => {
    setOpenHelp(false);
  };

  const handleProfileClose = () => {
    setOpenProfile(false);
    setAnchorEl(null);
  };

  const handleAccountEditClose = (info) => {
    setOpenAccountEdit(false);
    setAnchorEl(null);
    setToastMessage({ message: info.message, messageType: info.messageType });
  };

  return (
    <>
      {!user && <Navigate to="/" replace={true} />}
      <div className="dash-board">
        <h2> Tattoo Tattle: Hi {user.firstName}! </h2>
        <IconButton aria-label="helper-text" onClick={handleHelpOpen}>
          <HelpOutlineIcon color="primary" fontSize="large" />
        </IconButton>
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Account Dashboard
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={profileClick}>Profile</MenuItem>
          <MenuItem onClick={accountEditsClick}>My account</MenuItem>
          <MenuItem onClick={logOut}>Logout</MenuItem>
        </Menu>
        <Modal
          open={openProfile}
          onClose={handleProfileClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <ClientProfile />
          </div>
        </Modal>
        <Modal
          open={openAccountEdit}
          onClose={handleAccountEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <AccountEdits handleAccountEditClose={handleAccountEditClose} />
          </div>
        </Modal>
        <Modal
          open={openHelp}
          onClose={handleHelpClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <UserHelpInstructions />
          </div>
        </Modal>
      </div>
      {toastMessage.message !== "" && <ToastMessage info={toastMessage} />}
    </>
  );
};
