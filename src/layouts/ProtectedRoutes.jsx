import React from "react";
import { Outlet } from "react-router-dom";
import { Login } from "../Components/Login/Login";
import { useAuthContext } from "../providers/auth-provider";

export const ClientProtectedRoute = () => {
  const { loggedIn, userType } = useAuthContext();
  return loggedIn && userType === "client" ? <Outlet /> : <Login />;
};

export const ArtistProtectedRoute = () => {
  const { loggedIn, userType } = useAuthContext();
  return loggedIn && userType === "artist" ? <Outlet /> : <Login />;
};
