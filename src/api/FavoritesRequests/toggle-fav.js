import { API_CONFIG } from "../config";
import { getFavoritesFromDB } from "../get-info-db";

export const createFavorite = (userId, tattooId) => {
  const body = JSON.stringify({
    userId,
    tattooId,
  });

  fetch(API_CONFIG.baseURL + "/favorites/", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create new favorite");
    }
    return response;
  });
};

export const deleteFavorite = (id) => {
  fetch(API_CONFIG.baseURL + "/favorites/" + id, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete favorite");
    }
    return response;
  });
};

export const toggleFavoriteinDB = async ({ userId, tattooId }) => {
  const allFavorites = await getFavoritesFromDB();
  const matchingFavorite = allFavorites.find(
    (favorite) => favorite.userId === userId && favorite.tattooId === tattooId
  );
  if (matchingFavorite) {
    return await deleteFavorite(matchingFavorite.id);
  } else {
    return await createFavorite(userId, tattooId);
  }
};
