import { API_CONFIG } from "../config";

export const updateClientInDB = (clientId, email, password) => {
  return fetch(API_CONFIG.baseURL + "/clients/" + clientId, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const updateArtistInDB = (artistId, email, password) => {
  return fetch(API_CONFIG.baseURL + "/artists/" + artistId, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};
