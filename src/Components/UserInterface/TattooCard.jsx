/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
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

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const random_bg_color = () => {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  const bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
};

const avatarBgColor = random_bg_color();

// eslint-disable-next-line react/prop-types
export const TattooCard = ({ userId, tattoo }) => {
  const { userType } = useAuthContext();
  const { toggleFavorites, favorites } = useFavoritesContext();
  const { activeSelector, deleteTattoo, activeSelectorClick } =
    useTattooTattleContext();
  const {
    artist,
    title,
    image,
    description,
    id,
    dateCreated,
    price,
    statesInput,
    tattooStyleInput,
  } = tattoo;

  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const displayImage = image !== "" ? image : notFoundImage;
  const isFavorite =
    favorites.find(
      (favorite) => favorite.userId === userId && favorite.tattooId === id
    ) !== undefined;

  const priceDescription =
    price === 1001
      ? "Over $1000"
      : price === 1000
      ? "Between $500 and $1000"
      : price === 500
      ? "Between $100 and $500"
      : "Less than $100";

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
    <Card sx={{ maxWidth: 345, minWidth: 275, marginTop: 5, width: 275 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ background: { avatarBgColor } }}
            className="avatar"
            aria-label="tattoo"
          >
            {artist[0]}
          </Avatar>
        }
        title={title}
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
          <strong>Tattoo Style: </strong> {tattooStyleInput?.toString()}
        </Typography>
      </CardContent>
      {userType === "client" && (
        <CardActions disableSpacing>
          <IconButton aria-label="add-to-favorites" onClick={handleHeartClick}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton aria-label="add-request" onClick={handleOpen}>
            <AddCircleIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
      {userType === "artist" && (
        <CardActions disableSpacing>
          <IconButton
            aria-label="add-to-favorites"
            onClick={handleDeleteTattooClick}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <IconButton aria-label="add-request" onClick={handleOpen}>
            <AddCircleOutlineIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show-more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <strong>Description: </strong>
            {description}{" "}
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
        </CardContent>
      </Collapse>

      {userType === "client" && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <CreateRequest tattoo={tattoo} handleClose={handleClose}/>
          </div>
        </Modal>
      )}

      {userType === "artist" && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <EditTattoo id={tattoo.id} handleClose={handleClose} />
          </div>
        </Modal>
      )}
    </Card>
  );
};