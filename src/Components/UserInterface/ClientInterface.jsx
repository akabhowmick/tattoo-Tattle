import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../providers/auth-provider";
import { useTattooTattleContext } from "../../providers/tattoo-provider";
import { DashBoard } from "./DashBoard";
import {
  Box,
  Chip,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { tattooStyles, usStates } from "../../api/config";
import { Pagination } from "./Pagination";
import { ToastMessage } from "./ToastMessage";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectField, theme) {
  return {
    fontWeight:
      selectField.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const theme = createTheme();

export const ClientInterface = () => {
  const { user } = useAuthContext();
  const { activeSelector, activeSelectorClick, handleFilters, filters } =
    useTattooTattleContext();
  const [toastMessage, setToastMessage] = useState({
    message: "Logged in",
    messageType: "success",
  });

  useEffect(() => {
    setToastMessage({ message: "", messageType: "" });
  }, []);

  const [firstView, setFirstView] = useState(true);
  const handlePriceChange = (event) => {
    setFirstView(false);
    handleFilters("price", event.target.value);
  };

  const filterClick = (selector, id) => {
    setFirstView(false);
    activeSelectorClick(selector, id);
  };

  const handleTattooStyleChange = (event) => {
    setFirstView(false);
    const {
      target: { value },
    } = event;
    handleFilters(
      "styles",
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleUsStatesChange = (event) => {
    setFirstView(false);
    const {
      target: { value },
    } = event;
    handleFilters(
      "states",
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      {firstView && toastMessage !== "" && activeSelector === "all" && (
        <ToastMessage info={{ message: "Logged in", messageType: "success" }} />
      )}
      <DashBoard />
      <div className="selectors-container">
        <div className="selectors">
          <div className="artist-selectors selectors">
            <div
              className={`selector ${activeSelector === "all" && "active"}`}
              onClick={() => filterClick("all", user.id)}
            >
              All Tattoos
            </div>
            <div
              className={`selector ${activeSelector === "favs" && "active"}`}
              onClick={() => filterClick("favs", user.id)}
            >
              Favorited
            </div>
            <div
              className={`selector ${activeSelector === "reqs" && "active"}`}
              onClick={() => filterClick("reqs", user.id)}
            >
              My Requests
            </div>
          </div>
          {activeSelector === "all" && (
            <div className="filter-div">
              <FormControl className="tattoo-filter" sx={{ m: 2, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Price
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  name="price"
                  value={filters.price}
                  label="Price Range"
                  onChange={handlePriceChange}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={100}>&lt; 100</MenuItem>
                  <MenuItem value={500}>100 - 500</MenuItem>
                  <MenuItem value={1000}>500 - 1000</MenuItem>
                  <MenuItem value={1001}>&gt; 1000</MenuItem>
                </Select>
              </FormControl>
              <FormControl className="tattoo-filter" sx={{ m: 2, width: 120 }}>
                <InputLabel id="demo-multiple-chip-label">Location</InputLabel>
                <Select
                  required
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={filters.states}
                  onChange={handleUsStatesChange}
                  name="states"
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="States of Operation"
                    />
                  }
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {usStates.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, filters.states, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="tattoo-filter" sx={{ m: 2, width: 200 }}>
                <InputLabel>Tattoo Style(s)</InputLabel>
                <Select
                  required
                  labelId="demo-multiple-chip-label"
                  multiple
                  value={filters.styles}
                  name="style"
                  onChange={handleTattooStyleChange}
                  input={<OutlinedInput label="Tattoo Style(s)" />}
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {tattooStyles.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, filters.styles, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
        </div>
      </div>
      {activeSelector !== "reqs" && <Pagination currentDisplay={"tats"} />}
      {activeSelector === "reqs" && <Pagination currentDisplay={"reqs"} />}
    </div>
  );
};
