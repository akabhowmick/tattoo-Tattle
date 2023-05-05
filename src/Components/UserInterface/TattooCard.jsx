/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Modal } from "@mui/material";
import { CreateRequest } from "../../Components/CreateAndEditForms/CreateRequest";
import { useFavoritesContext } from "../../providers/favorites-provider";
import { useTattooTattleContext } from "../../providers/tattoo-provider";
import { useAuthContext } from "../../providers/auth-provider";
import { EditTattoo } from "../CreateAndEditForms/EditTattoo";
import notFoundImage from "../../assets/not-found.png";
import { red, green, blue } from "@mui/material/colors";
import { ToastMessage } from "./ToastMessage";
import { TattooInfo } from "./TattooInfo";

// eslint-disable-next-line react/prop-types
export const TattooCard = ({ userId, tattoo }) => {
  const { userType } = useAuthContext();
  const { toggleFavorites, favorites } = useFavoritesContext();
  const { activeSelector, deleteTattoo, activeSelectorClick } =
    useTattooTattleContext();
  const { artist, title, image, id, tattooStyleInput } = tattoo;

  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState({
    message: "",
    messageType: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const tattooToastSuccess = (info) => {
    setToastMessage({ message: info.message, messageType: info.messageType });
  };

  const displayImage = image !== "" ? image : notFoundImage;
  const isFavorite =
    favorites.find(
      (favorite) => favorite.userId === userId && favorite.tattooId === id
    ) !== undefined;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleHeartClick = async () => {
    const body = {
      userId: userId,
      tattooId: id,
    };
    await toggleFavorites(body);
    if (isFavorite && activeSelector === "favs") {
      activeSelectorClick("refresh-favs", userId);
    }
  };

  const handleDeleteTattooClick = () => {
    deleteTattoo(id);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, minWidth: 275, marginTop: 5, width: 275 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ backgroundColor: green[500] }}
              className="avatar"
              aria-label="tattoo"
            >
              {artist[0]}
            </Avatar>
          }
          title={<Typography id="tattoo-title">{title}</Typography>}
          subheader={artist}
        />
        <CardMedia
          component="img"
          height="225"
          image={displayImage}
          alt="tattoo image"
        />
        <CardContent>
          <Typography variant="body1">
            <strong>Tattoo Style: </strong>
            <br />
            {tattooStyleInput?.toString()}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          {userType === "client" && (
            <>
              <IconButton
                className="btn-no-outline"
                aria-label="add-to-favorites"
                onClick={handleHeartClick}
              >
                {isFavorite ? (
                  <FavoriteIcon sx={{ color: red[500] }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <IconButton
                aria-label="add-request"
                onClick={handleOpen}
                className="btn-no-outline"
              >
                <AddCircleIcon sx={{ color: blue[500] }} />
              </IconButton>
            </>
          )}
          {userType === "artist" && (
            <>
              <IconButton
                aria-label="delete-tattoo"
                onClick={handleDeleteTattooClick}
                sx={{ color: red[500] }}
                className="btn-no-outline"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <IconButton
                aria-label="add-request"
                onClick={handleOpen}
                className="btn-no-outline"
              >
                <AddCircleOutlineIcon sx={{ color: blue[500] }} />
              </IconButton>
            </>
          )}
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className="btn-no-outline"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            {userType === "client" ? (
              <CreateRequest
                tattoo={tattoo}
                handleClose={handleClose}
                tattooRequestSuccess={tattooToastSuccess}
              />
            ) : (
              <EditTattoo
                id={tattoo.id}
                handleClose={handleClose}
                tattooEditSuccess={tattooToastSuccess}
              />
            )}
          </div>
        </Modal>

        <Modal
          open={expanded}
          onClose={() => setExpanded(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <TattooInfo tattoo={tattoo} />
          </div>
        </Modal>
      </Card>
      {toastMessage.message !== "" && <ToastMessage info={toastMessage} />}
    </>
  );
};
