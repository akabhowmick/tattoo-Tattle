// I made one file with all the get methods since they are all only using the base url and getting info from the db

import { API_CONFIG } from "./config";

export const getClientsFromDB = () => {
  return fetch( API_CONFIG.baseURL + "/clients").then((response) => 
    response.json()
  );
}

export const getArtistsFromDB = () => {
  return fetch( API_CONFIG.baseURL + "/artists").then((response) => 
    response.json()
  );
}

export const getTattoosFromDB = () => {
  return fetch( API_CONFIG.baseURL + "/tattoos").then((response) => 
    response.json()
  );
}

export const getRequestsFromDB = () => {
  return fetch( API_CONFIG.baseURL + "/requests").then((response) => 
    response.json()
  );
}

export const getFavoritesFromDB = () => {
  return fetch( API_CONFIG.baseURL + "/favorites").then((response) => 
    response.json()
  );
}