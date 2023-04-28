/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { API_CONFIG } from "../../api/config";

export const UploadImage = ({ tattooId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const url = API_CONFIG.baseURL + "/tattooImages/" + tattooId;
  console.log(url);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </>
  );
};

export default UploadImage;
