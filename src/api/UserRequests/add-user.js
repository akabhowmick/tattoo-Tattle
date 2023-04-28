import { API_CONFIG } from "../config";

export const addClientToDB = ({
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
}) => {
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  });

  return fetch(API_CONFIG.baseURL + "/clients/", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body,
  });
};

export const addArtistToDB = ({
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  statesLocation,
  tattooStyles
}) => {
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    statesLocation,
    tattooStyles
  });

  return fetch(API_CONFIG.baseURL + "/artists", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body,
  });
};
