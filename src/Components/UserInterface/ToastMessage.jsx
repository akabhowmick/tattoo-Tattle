/* eslint-disable react/prop-types */
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastMessage = ({message, messageType}) => {
  const notify = () => toast(`${message, messageType}`);

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}
