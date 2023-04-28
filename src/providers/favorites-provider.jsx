/* eslint-disable react/prop-types */
import React, { useState, useEffect, createContext, useContext } from "react";
import { toggleFavoriteinDB } from "../api/FavoritesRequests/toggle-fav";
import { getFavoritesFromDB } from "../api/get-info-db";

const FavoritesContext = createContext({});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const refetchFavorites = () => {
    getFavoritesFromDB().then(setFavorites);
  };

  useEffect(() => {
    refetchFavorites();

  }, []);

  const toggleFavorites = ({ userId, tattooId }) => {
    return toggleFavoriteinDB({ userId, tattooId }).then(() => {
      refetchFavorites();
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  return {
    favorites: context.favorites,
    toggleFavorites: context.toggleFavorites,
  };
};
