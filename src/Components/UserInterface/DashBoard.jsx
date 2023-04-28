import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { useAuthContext } from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
import { ClientProfile } from "./Profile";
import { AccountEdits } from "../CreateAndEditForms/AccountEdits";

export const DashBoard = () => {
  const { user, setUser, setLoggedIn } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openAccountEdit, setOpenAccountEdit] = React.useState(false);
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

  const profileClick = () => {
    setOpenProfile(true);
  };

  const accountEditsClick = () => {
    setOpenAccountEdit(true);
  };

  const handleProfileClose = () => {
    setOpenProfile(false);
    setAnchorEl(null);
  };

  const handleAccountEditClose = () => {
    setOpenAccountEdit(false);
    setAnchorEl(null);
  };

  return (
    <>
      {!user && <Navigate to="/" replace={true} />}
      <div className="dash-board">
        <h2> Tattoo Tattle: Hi {user.firstName}! </h2>
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
            <AccountEdits handleAccountEditClose={handleAccountEditClose}/>
          </div>
        </Modal>
      </div>
    </>
  );
};
