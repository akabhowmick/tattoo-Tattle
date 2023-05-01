import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { CreateAccount } from "./Components/Login/CreateAccount";
import { Login } from "./Components/Login/Login";
import { NotFound } from "./Components/NotFound";
import { ArtistInterface } from "./Components/UserInterface/ArtistInterface";
import { ClientInterface } from "./Components/UserInterface/ClientInterface";
import {
  ClientProtectedRoute,
  ArtistProtectedRoute,
} from "./layouts/ProtectedRoutes";
import RootLayout from "./layouts/RootLayout";
import { useAuthContext } from "./providers/auth-provider";
import { FavoritesProvider } from "./providers/favorites-provider";
import { RequestsProvider } from "./providers/requests-provider";
import { TattooProvider } from "./providers/tattoo-provider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Login />} />
      <Route path="signup" element={<CreateAccount />} />
      <Route element={<ClientProtectedRoute />}>
        <Route path="client-home" element={<ClientInterface />} />
      </Route>
      <Route element={<ArtistProtectedRoute />}>
        <Route path="artist-home" element={<ArtistInterface />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const { userType, user, loggedIn } = useAuthContext();
  return (
    <>
      <TattooProvider userType={userType} user={user} loggedIn={loggedIn}>
        <RequestsProvider userType={userType} user={user} loggedIn={loggedIn}>
          <FavoritesProvider>
            <RouterProvider router={router} />
          </FavoritesProvider>
        </RequestsProvider>
      </TattooProvider>
    </>
  );
}

// Props were drilled into the Tattoo and Request Providers because the back end should take care of the
// requests and tattoos displayed and for that they need info on the user

export default App;
