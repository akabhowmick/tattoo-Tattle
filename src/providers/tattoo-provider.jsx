/* eslint-disable react/prop-types */
import React, { useState, useEffect, createContext, useContext } from "react";
import { getFavoritesFromDB, getTattoosFromDB } from "../api/get-info-db";
import { addTattooToDB } from "../api/TattooRequests/add-tattoo";
import { deleteTattooFromDb } from "../api/TattooRequests/delete-tattoo";
import { updateTattooInDB } from "../api/TattooRequests/edit-tattoo";

const TattooTattleContext = createContext({});

const initialFilters = {
  price: "",
  states: [],
  styles: [],
};

export const TattooProvider = ({ children, userType, user, loggedIn }) => {
  const [tattoos, setTattoos] = useState([]);
  const [activeSelector, setActiveSelector] = useState("all");
  const [filters, setFilters] = useState(initialFilters);

  const addTattoo = async (tattoo) => {
    await addTattooToDB({
      artistId: tattoo.artistId,
      title: tattoo.title,
      image: tattoo.image,
      dateCreated: tattoo.dateCreated,
      artist: tattoo.artist,
      description: tattoo.description,
      price: tattoo.price,
      statesInput: tattoo.statesInput,
      tattooStyleInput: tattoo.tattooStyleInput,
    });
    refetchTattoos();
  };

  const updateTattoo = async (id, title, description) => {
    await updateTattooInDB(id, title, description);
    refetchTattoos();
  };

  const deleteTattoo = async (tattooId) => {
    await deleteTattooFromDb(tattooId);
    refetchTattoos();
  };

  const displayFavs = async (userId) => {
    const allTats = await getTattoosFromDB();
    const allFavs = await getFavoritesFromDB();
    const userFavs = allFavs.filter((favorite) => favorite.userId === userId);
    const favTats = [];
    userFavs.forEach((userFav) => {
      favTats.push(allTats.find((tattoo) => tattoo.id === userFav.tattooId));
    });
    setTattoos(favTats);
  };

  const activeSelectorClick = (selector, userId) => {
    setFilters(initialFilters);
    refetchTattoos();
    if (selector === activeSelector) {
      setActiveSelector("all");
    } else {
      if (selector === "favs" || selector === "reqs" || selector === "all")
        setActiveSelector(selector);
    }
    if (
      (selector === "favs" && activeSelector !== "favs") ||
      selector === "refresh-favs"
    ) {
      displayFavs(userId);
    }
  };

  const filterByPrice = async (tatArray, price) => {
    let tatsFilteredByPrice = tatArray;
    if (price) {
      tatsFilteredByPrice = tatArray.filter((tattoo) => tattoo.price === price);
    }
    return tatsFilteredByPrice;
  };

  const filterByStates = async (tatArray, states) => {
    let tatsFilteredByStates = [];
    if (states.length !== 0) {
      states.forEach((state) => {
        tatArray.filter((tattoo) => {
          if (
            tattoo.statesInput.includes(state) &&
            !tatsFilteredByStates.includes(tattoo)
          ) {
            tatsFilteredByStates.push(tattoo);
          }
        });
      });
    } else {
      tatsFilteredByStates = tatArray;
    }
    return tatsFilteredByStates;
  };

  const filterByStyles = async (tatArray, styles) => {
    let tatsFilteredByStyles = [];
    if (styles.length !== 0) {
      styles.forEach((style) => {
        tatArray.filter((tattoo) => {
          if (
            tattoo.tattooStyleInput.includes(style) &&
            !tatsFilteredByStyles.includes(tattoo)
          ) {
            tatsFilteredByStyles.push(tattoo);
          }
        });
      });
    } else {
      tatsFilteredByStyles = tatArray;
    }
    return tatsFilteredByStyles;
  };

  const handleFilters = async (filterType, filterValue) => {
    setFilters({ ...filters, [filterType]: filterValue });
    const allTats = await getTattoosFromDB();
    let filteredByPrice = [];
    let filteredByStatesPrice = [];
    let filteredByStylesStatesPrice = [];
    if (filterType === "price") {
      filteredByPrice = await filterByPrice(allTats, filterValue);
      filteredByStatesPrice = await filterByStates(
        filteredByPrice,
        filters.states
      );
      filteredByStylesStatesPrice = await filterByStyles(
        filteredByStatesPrice,
        filters.styles
      );
    } else if (filterType === "styles") {
      filteredByPrice = await filterByPrice(allTats, filters.price);
      filteredByStatesPrice = await filterByStates(
        filteredByPrice,
        filters.states
      );
      filteredByStylesStatesPrice = await filterByStyles(
        filteredByStatesPrice,
        filterValue
      );
    } else if (filterType === "states") {
      filteredByPrice = await filterByPrice(allTats, filters.price);
      filteredByStatesPrice = await filterByStates(
        filteredByPrice,
        filterValue
      );
      filteredByStylesStatesPrice = await filterByStyles(
        filteredByStatesPrice,
        filters.styles
      );
    }
    setTattoos(filteredByStylesStatesPrice);
  };

  const refetchTattoos = async () => {
    const allTats = await getTattoosFromDB();
    if (userType === "client") {
      setTattoos(allTats);
    } else {
      const artistTats = allTats.filter((tat) => tat.artistId === user?.id);
      setTattoos(artistTats);
    }
  };

  useEffect(() => {
    refetchTattoos();
    setActiveSelector("all");
    setFilters(initialFilters);
  }, [loggedIn]);

  return (
    <TattooTattleContext.Provider
      value={{
        tattoos,
        activeSelector,
        activeSelectorClick,
        addTattoo,
        deleteTattoo,
        updateTattoo,
        handleFilters,
        filters,
        refetchTattoos
      }}
    >
      {children}
    </TattooTattleContext.Provider>
  );
};

export const useTattooTattleContext = () => {
  const context = useContext(TattooTattleContext);
  return {
    tattoos: context.tattoos,
    activeSelector: context.activeSelector,
    activeSelectorClick: context.activeSelectorClick,
    addTattoo: context.addTattoo,
    deleteTattoo: context.deleteTattoo,
    updateTattoo: context.updateTattoo,
    handleFilters: context.handleFilters,
    filters: context.filters,
    refetchTattoos: context.refetchTattoos
  };
};
