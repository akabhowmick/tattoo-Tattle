import { API_CONFIG } from "../config";

export const updateRequestInDB = (requestId, approvalStatus) => {
  return fetch(API_CONFIG.baseURL + "/requests/" + requestId, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      approvalStatus
    }),
  });
};