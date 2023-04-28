import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useTattooTattleContext } from "../../providers/tattoo-provider";
import { useAuthContext } from "../../providers/auth-provider";
// import UploadImage from "./ImageUploader";

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginBottom: "10px",
  marginTop: "-8px",
};

// eslint-disable-next-line react/prop-types
export const CreateTattoo = ({ setDisplaySelector }) => {
  const { addTattoo } = useTattooTattleContext();
  const { user } = useAuthContext();

  // used one state to see all validations; each component has the data, whether or not it is valid and a short message
  const [formValues, setFormValues] = useState({
    image: {
      data: "",
      valid: false,
      errorMessage: "",
    },
    tattooTitle: {
      data: "",
      valid: false,
      errorMessage: "",
    },
    tattooDescription: {
      data: "",
      valid: false,
      errorMessage: "",
    },
    price: {
      data: "",
      valid: false,
      errorMessage: "",
    },
    tattooStyleInput: {
      data: [],
      valid: false,
      errorMessage: "",
    },
    statesInput: {
      data: [],
      valid: false,
      errorMessage: "",
    },
  });

  const messageBodyValidation = (desc) => {
    if (!formValues.tattooDescription.data || desc.length < 20) {
      setFormValues({
        ...formValues,
        tattooDescription: {
          data: desc,
          valid: false,
          errorMessage: "Invalid: enter a description (>20 char)",
        },
      });
    } else {
      setFormValues({
        ...formValues,
        tattooDescription: {
          data: desc,
          valid: true,
          errorMessage: "",
        },
      });
    }
  };

  const titleValidation = (title) => {
    if (!formValues.tattooTitle.data || title.length < 5) {
      setFormValues({
        ...formValues,
        tattooTitle: {
          data: title,
          valid: false,
          errorMessage: "Invalid: enter a title",
        },
      });
    } else {
      setFormValues({
        ...formValues,
        tattooTitle: { data: title, valid: true, errorMessage: "" },
      });
    }
  };

  const handlePriceChange = (event) => {
    if (event.target.value === "") {
      setFormValues({
        ...formValues,
        price: {
          data: event.target.value,
          valid: false,
          errorMessage: "Please enter a price range",
        },
      });
    } else {
      setFormValues({
        ...formValues,
        price: { data: event.target.value, valid: true, errorMessage: "" },
      });
    }
  };

  const handleTattooStyleChange = (event) => {
    if (event.target.value.length === 0) {
      setFormValues({
        ...formValues,
        tattooStyleInput: {
          data: typeof value === "string" ? event.target.value.split(",") : event.target.value,
          valid: false,
          errorMessage: "Enter a tattoo style",
        },
      });
    } else {
      setFormValues({
        ...formValues,
        tattooStyleInput: {
          data: typeof value === "string" ? event.target.value.split(",") : event.target.value,
          valid: true,
          errorMessage: "",
        },
      });
    }
  };

  const handleUsStatesChange = (event) => {
    if (event.target.value.length === 0) {
      setFormValues({
        ...formValues,
        statesInput: {
          data:
            typeof value === "string"
              ? event.target.value.split(",")
              : event.target.value,
          valid: false,
          errorMessage: "Enter studio locations",
        },
      });
    } else {
      setFormValues({
        ...formValues,
        statesInput: {
          data:
            typeof value === "string"
              ? event.target.value.split(",")
              : event.target.value,
          valid: true,
          errorMessage: "",
        },
      });
    }
  };

  const imageValidation = (e) => {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setFormValues({
      ...formValues,
      image: {
        data: imageURL,
        valid: true,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formValues.image.valid &&
      formValues.tattooTitle.valid &&
      formValues.tattooDescription.valid &&
      formValues.tattooStyleInput.valid &&
      formValues.statesInput.valid &&
      formValues.price.valid
    ) {
      const newTattoo = {
        artistId: user.id,
        title: formValues.tattooTitle.data,
        image: formValues.image.data,
        dateCreated: new Date().toLocaleDateString(),
        artist: user.firstName + " " + user.lastName,
        description: formValues.tattooDescription.data,
        price: formValues.price.data,
        statesInput: formValues.statesInput.data,
        tattooStyleInput: formValues.tattooStyleInput.data,
      };
      addTattoo(newTattoo);
      setDisplaySelector("tats");
    }
  };

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

  return (
    <div>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Typography
          id="modal-modal-title"
          style={{ color: "black" }}
          variant="h6"
          component="h2"
        >
          Add New Tattoo To Your Collection
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="tattoo-title"
          label="Tattoo Title"
          type="text"
          id="tattoo-title"
          autoComplete="Tattoo Title"
          autoFocus
          onChange={(e) => {
            titleValidation(e.target.value);
          }}
        />
        {!formValues.tattooTitle.valid && (
          <Typography sx={errorStyle} variant="h6" component="h6">
            {formValues.tattooTitle.errorMessage}
          </Typography>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          name="tattoo-description"
          label="Tattoo Description"
          type="text"
          id="tattoo-description"
          autoComplete="Tattoo Description"
          autoFocus
          onChange={(e) => {
            messageBodyValidation(e.target.value);
          }}
        />
        {!formValues.tattooDescription.valid && (
          <Typography sx={errorStyle} variant="h6" component="h6">
            {formValues.tattooDescription.errorMessage}
          </Typography>
        )}
        <div className="form-flex-div">
          <div className="field-error-div">
            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Price
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={formValues.price.data}
                label="Price Range"
                onChange={handlePriceChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={100}>&lt; 100</MenuItem>
                <MenuItem value={500}>100 - 500</MenuItem>
                <MenuItem value={1000}>500 - 1000</MenuItem>
                <MenuItem value={1001}>&gt; 1000</MenuItem>
              </Select>
            </FormControl>
            {!formValues.price.valid && (
              <Typography sx={errorStyle} variant="h6" component="h6">
                {formValues.price.errorMessage}
              </Typography>
            )}
          </div>
          <div className="field-error-div">
            <FormControl sx={{ m: 2, width: 120 }}>
              <InputLabel id="demo-multiple-chip-label">Location</InputLabel>
              <Select
                required
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={formValues.statesInput.data}
                onChange={handleUsStatesChange}
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
                {user.statesLocation.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, formValues.statesInput.data, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {!formValues.statesInput.valid && (
              <Typography sx={errorStyle} variant="h6" component="h6">
                {formValues.statesInput.errorMessage}
              </Typography>
            )}
          </div>
          <div className="field-error-div">
            <FormControl sx={{ m: 2, width: 200 }}>
              <InputLabel>Tattoo Style(s)</InputLabel>
              <Select
                required
                labelId="demo-multiple-chip-label"
                multiple
                value={formValues.tattooStyleInput.data}
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
                {user.tattooStyles.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(
                      name,
                      formValues.tattooStyleInput.data,
                      theme
                    )}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {!formValues.tattooStyleInput.valid && (
              <Typography sx={errorStyle} variant="h6" component="h6">
                {formValues.tattooStyleInput.errorMessage}
              </Typography>
            )}
          </div>
        </div>
        <div className="upload-file-div">
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden onChange={(e) => imageValidation(e)} />
          </Button>
          <img className="create-tat-img" src={formValues.image.data} />
          {!formValues.image.valid && (
            <Typography sx={errorStyle} variant="h6" component="h6">
              {formValues.image.errorMessage}
            </Typography>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add New Tattoo!
        </Button>
      </Box>
    </div>
  );
};
