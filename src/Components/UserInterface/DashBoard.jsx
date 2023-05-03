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
        <div className="user-greeting">
          <h2 style={{ margin: 0, fontSize: "1.75rem" }}>
            {" "}
            Tattoo Tattle: Hi {user.firstName}!{" "}
          </h2>
          <div style={{ display: "flex" }}>
            <h4>Need Help:</h4>
            <IconButton
              aria-label="helper-text"
              onClick={() => setOpenHelp(true)}
              className="btn-no-outline"
            >
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
          </div>
        </div>
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
          <MenuItem onClick={() => setOpenProfile(true)}>Profile</MenuItem>
          <MenuItem onClick={() => setOpenAccountEdit(true)}>
            My account
          </MenuItem>
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
          <div className="user-help">
            <UserHelpInstructions />
          </div>
        </Modal>
      </div>
      {toastMessage.message !== "" && <ToastMessage info={toastMessage} />}
    </>
  );
};
