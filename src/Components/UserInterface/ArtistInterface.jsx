import { Pagination } from "./Pagination";
import React, { useState } from "react";
import { CreateTattoo } from "../CreateAndEditForms/CreateTattoo";
import { DashBoard } from "./DashBoard";
import { ToastMessage } from "./ToastMessage";

export const ArtistInterface = () => {
  const [displaySelector, setDisplaySelector] = useState("tats");
  const [toastMessage, setToastMessage] = useState({
    message: "Logged in",
    messageType: "success",
  });
  const [firstView, setFirstView] = useState(true);
  const filterClick = (selector) => {
    setFirstView(false);
    setToastMessage({ message: "", messageType: "" });
    if (displaySelector !== selector) {
      setDisplaySelector(selector);
    } else {
      setDisplaySelector("tats");
    }
  };

  return (
    <div>
      {firstView && toastMessage !== "" && displaySelector === "tats" && (
        <ToastMessage info={{ message: "Logged in", messageType: "success" }} />
      )}
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
