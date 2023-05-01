/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customId = "custom-id-yes";
export const showToastMessage = (info) => {
  const { message, messageType } = info;
  if (messageType === "success") {
    toast.success(`${message} Successfully!`, {
      position: toast.POSITION.TOP_CENTER,
      toastId: customId,
    });
  } else if (messageType === "error") {
    toast.error(`Error: ${message}!`, {
      position: toast.POSITION.TOP_CENTER,
      toastId: customId,
    });
  } else if (messageType === "info") {
    toast.info(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  } else if (messageType === "warning") {
    toast.warning(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

export const ToastMessage = ({ info }) => {
  useEffect(() => {
    showToastMessage(info);
  }, [info]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
