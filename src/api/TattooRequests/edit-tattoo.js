import { API_CONFIG } from "../config";

export const updateTattooInDB = (tattooId, title, description) => {
  return fetch(API_CONFIG.baseURL + "/tattoos/" + tattooId, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      title,
      description
    }),
  });
};