import { API_CONFIG } from "../config";

export const addRequestToDB = ({
  clientName,
  artistName,
  messageBody,
  approvalStatus,
  tattooOfInterestTitle,
  artistId,
  clientId
}) => {
  const body = JSON.stringify({
    clientName,
    artistName,
    messageBody,
    approvalStatus,
    tattooOfInterestTitle,
    artistId,
    clientId
  });

  return fetch(API_CONFIG.baseURL + "/requests/", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body,
  });
};
