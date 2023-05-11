/* eslint-disable react/prop-types */
import React, { useState, createContext, useContext } from "react";
import { getArtistsFromDB, getClientsFromDB } from "../api/get-info-db";
import { addArtistToDB, addClientToDB } from "../api/UserRequests/add-user";
import { loginArtist, loginClient } from "../api/UserRequests/login-user";
import {
  updateClientInDB,
  updateArtistInDB,
} from "../api/UserRequests/edit-user-info";
import { useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState("client");
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const signInUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    if(user.statesLocation){
      setUserType("artist");
    }
    setLoggedIn(true);
  };

  const logOutUser = () => {
    setUser({});
    setLoggedIn(false);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) {
      signInUser(JSON.parse(maybeUser));
    }
  }, []);

  // register new user
  const addArtist = async (artist) => {
    await addArtistToDB({
      firstName: artist.firstName,
      lastName: artist.lastName,
      email: artist.email,
      password: artist.password,
      phoneNumber: artist.phoneNumber,
      tattooStyles: artist.tattooStyleInput,
      statesLocation: artist.statesInput,
    });
    const allArtists = await getArtistsFromDB();
    const newAddedArtist = allArtists.find(
      (user) => user.email === artist.email && user.password === artist.password
    );
    signInUser(newAddedArtist);
  };

  const addClient = async (client) => {
    await addClientToDB({
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      password: client.password,
      phoneNumber: client.phoneNumber,
    });
    const allClients = await getClientsFromDB();
    const newAddedClient = allClients.find(
      (user) => user.email === client.email && user.password === client.password
    );
    signInUser(newAddedClient);
  };

  //login old user
  const signInArtist = async (client) => {
    const artist = await loginArtist({
      email: client.email,
      password: client.password,
    });
    if (artist) {
      signInUser(artist);
      return true;
    } else {
      return false;
    }
  };

  const signInClient = async (client) => {
    const user = await loginClient({
      email: client.email,
      password: client.password,
    });
    if (user) {
      signInUser(user);
      return true;
    } else {
      return false;
    }
  };

  const editUser = async (email, password) => {
    if (userType === "client") {
      await updateClientInDB(user.id, email, password);
    } else if (userType === "artist") {
      await updateArtistInDB(user.id, email, password);
    }
    signInUser({ ...user, email: email, password: password })
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userType,
        setUserType,
        addClient,
        addArtist,
        signInArtist,
        signInClient,
        loggedIn,
        setLoggedIn,
        editUser,
        logOutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return {
    user: context.user,
    setUser: context.setUser,
    userType: context.userType,
    setUserType: context.setUserType,
    addClient: context.addClient,
    addArtist: context.addArtist,
    signInArtist: context.signInArtist,
    signInClient: context.signInClient,
    loggedIn: context.loggedIn,
    setLoggedIn: context.setLoggedIn,
    editUser: context.editUser,
    logOutUser: context.logOutUser
  };
};
