/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastProperties = {
  duration: 1000,
  position: toast.POSITION.TOP_CENTER,
  toastId: "custom-id-yes",
};

export const showToastMessage = (info) => {
  const { message, messageType } = info;
  if (messageType === "success") {
    toast.success(`${message} Successfully!`, toastProperties);
  } else if (messageType === "error") {
    toast.error(`Error: ${message}!`, toastProperties);
  }
};

export const ToastMessage = ({ info }) => {
  useEffect(() => {
    showToastMessage(info);
  }, [info]);

  return (
    <div>
      <ToastContainer autoClose={1000}/>
    </div>
  );
};
