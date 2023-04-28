import { API_CONFIG } from "../config";

export const deleteTattooFromDb = (tattooId) => {
  return fetch(API_CONFIG.baseURL + "/tattoos/" + tattooId, {
    method: "delete",
  });
};
