import { Pagination } from "./Pagination";
import React, { useState } from "react";
import { CreateTattoo } from "../CreateAndEditForms/CreateTattoo";
import { DashBoard } from "./DashBoard";

export const ArtistInterface = () => {
  const [displaySelector, setDisplaySelector] = useState("tats");

  const filterClick = (selector) => {
    if (displaySelector !== selector) {
      setDisplaySelector(selector);
    } else {
      setDisplaySelector("tats");
    }
  };

  return (
    <div>
      <DashBoard />
      <div className="selectors-container">
        <div className="artist-selectors selectors">
          <div
            className={`selector ${displaySelector === "tats" && "active"}`}
            onClick={() => filterClick("tats")}
          >
            Your Tattoos
          </div>
          <div
            className={`selector ${displaySelector === "reqs" && "active"}`}
            onClick={() => filterClick("reqs")}
          >
            My Requests
          </div>
          <div
            className={`selector ${displaySelector === "add" && "active"}`}
            onClick={() => filterClick("add")}
          >
            Add New Tattoo
          </div>
        </div>
      </div>
      {(displaySelector === "tats" || displaySelector === null) && (
        <Pagination currentDisplay={"tats"} />
      )}
      {displaySelector === "reqs" && <Pagination currentDisplay={"reqs"} />}
      {displaySelector === "add" && (
        <div className="tattoo-form">
          <CreateTattoo/>
        </div>
      )}
    </div>
  );
};
