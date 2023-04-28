import { API_CONFIG } from "../config";

export const addTattooToDB = ({
  artistId,
  title,
  image,
  dateCreated,
  artist,
  description,
  price,
  statesInput,
  tattooStyleInput,
}) => {
  const body = JSON.stringify({
    artistId,
    title,
    image,
    dateCreated,
    artist,
    description,
    price,
    statesInput,
    tattooStyleInput,
  });

  return fetch(API_CONFIG.baseURL + "/tattoos/", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body,
  });
};
