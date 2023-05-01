import { API_CONFIG } from "../config";

export const deleteRequestFromDb = (requestId) => {
  return fetch(API_CONFIG.baseURL + "/requests/" + requestId, {
    method: "delete",
  });
};
