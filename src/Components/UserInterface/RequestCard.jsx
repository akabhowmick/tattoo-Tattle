/* eslint-disable react/prop-types */
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import PendingIcon from "@mui/icons-material/Pending";
import { useAuthContext } from "../../providers/auth-provider";
import { green, grey, red } from "@mui/material/colors";
import { useRequestsContext } from "../../providers/requests-provider";

const random_bg_color = () => {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  const bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
};

const avatarBgColor = random_bg_color();

export const RequestCard = ({ request }) => {
  const {
    clientName,
    artistName,
    messageBody,
    approvalStatus,
    tattooOfInterestTitle,
    id,
  } = request;
  const { userType } = useAuthContext();
  const { editRequest } = useRequestsContext();

  const handleRequestClick = (approval) => {
    editRequest(id, approval);
  };

  const clientApprovalIcon = () => {
    if (approvalStatus === "Pending") {
      return (
        <IconButton aria-label="request-pending">
          <PendingIcon
            sx={{
              color: grey[500],
              fontSize: "50px",
            }}
          />
        </IconButton>
      );
    } else if (approvalStatus === "Denied") {
      return (
        <IconButton aria-label="request-denied">
          <HighlightOffIcon
            sx={{
              color: red[500],
              fontSize: "50px",
            }}
          />
        </IconButton>
      );
    } else if (approvalStatus === "Accepted") {
      return (
        <IconButton aria-label="request-accepted">
          <CheckCircleOutlineIcon
            sx={{
              color: green[500],
              fontSize: "50px",
            }}
          />
        </IconButton>
      );
    }
  };

  return (
    <Card sx={{ maxWidth: 345, minWidth: 275, marginTop: 5, width: 275 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ background: { avatarBgColor } }}
            className="avatar"
            aria-label="tattoo"
          >
            {artistName[0]}
          </Avatar>
        }
        title={"Client Inquiring: " + clientName}
        subheader={"For artist: " + artistName}
      />
      <CardContent className="req-card-content">
        <Typography variant="body2" color="text.secondary">
          <strong>
            Message{" "}
            {userType === "artist"
              ? `from ${clientName}:`
              : `to ${artistName}:`}
          </strong>{" "}
          {messageBody}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Tattoo Of Interest: </strong>
          {tattooOfInterestTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userType === "client" && clientApprovalIcon()}
          <strong>Approval Status:</strong> {approvalStatus}
        </Typography>
      </CardContent>
      {userType === "artist" && approvalStatus === "Pending" && (
        <div className="centered">
          <CardActions>
            <IconButton
              aria-label="deny-request"
              onClick={() => handleRequestClick("Denied")}
            >
              <HighlightOffIcon
                sx={{
                  color: red[200],
                  fontSize: "70px",
                  "&:hover": { color: red[500] },
                }}
              />
            </IconButton>
            <IconButton
              aria-label="accept-request"
              onClick={() => handleRequestClick("Accepted")}
            >
              <CheckCircleOutlineIcon
                sx={{
                  color: green[200],
                  fontSize: "70px",
                  "&:hover": { color: green[500] },
                }}
              />
            </IconButton>
          </CardActions>
        </div>
      )}
      {userType === "artist" && approvalStatus === "Accepted" && (
        <div className="centered">
          <CardActions>
            <IconButton
              aria-label="deny-request"
              onClick={() => handleRequestClick("Denied")}
            >
              <HighlightOffIcon
                sx={{
                  color: red[100],
                  fontSize: "50px",
                }}
              />
            </IconButton>
            <IconButton
              aria-label="accept-request"
              onClick={() => handleRequestClick("Accepted")}
            >
              <CheckCircleOutlineIcon
                sx={{
                  color: green[500],
                  fontSize: "70px",
                }}
              />
            </IconButton>
          </CardActions>
        </div>
      )}
      {userType === "artist" && approvalStatus === "Denied" && (
        <div className="centered">
          <CardActions>
            <IconButton
              aria-label="deny-request"
              onClick={() => handleRequestClick("Denied")}
            >
              <HighlightOffIcon
                sx={{
                  color: red[500],
                  fontSize: "70px",
                }}
              />
            </IconButton>
            <IconButton
              aria-label="accept-request"
              onClick={() => handleRequestClick("Accepted")}
            >
              <CheckCircleOutlineIcon
                sx={{
                  color: green[100],
                  fontSize: "50px",
                }}
              />
            </IconButton>
          </CardActions>
        </div>
      )}
    </Card>
  );
};
