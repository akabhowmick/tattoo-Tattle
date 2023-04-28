import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Tattoo Tattle</h1>
          <NavLink to="/">Login</NavLink>
          <NavLink to="/client-home">Client</NavLink>
          <NavLink to="/artist-home">Artist</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
