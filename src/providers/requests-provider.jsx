/* eslint-disable react/prop-types */
import React, { useState, useEffect, createContext, useContext } from "react";
import { getRequestsFromDB } from "../api/get-info-db";
import { addRequestToDB } from "../api/ReqRequests/add-request";
import { updateRequestInDB } from "../api/ReqRequests/approve-request";

const RequestsContext = createContext({});

export const RequestsProvider = ({ children, userType, user, loggedIn }) => {
  const [requests, setRequests] = useState([]);

  const refetchRequests = async () => {
    const allRequests = await getRequestsFromDB();
    if (userType === "client" && user) {
      const clientRequests = allRequests.filter(
        (request) => request.clientId === user.id
      );
      setRequests(clientRequests);
    } else if (userType === "artist" && user) {
      const artistRequests = allRequests.filter(
        (request) => request.artistId === user.id
      );
      setRequests(artistRequests);
    }
  };

  const addRequest = async (request) => {
    await addRequestToDB({
      clientName: request.clientName,
      artistName: request.artistName,
      messageBody: request.messageBody,
      approvalStatus: request.approvalStatus,
      tattooOfInterestTitle: request.tattooOfInterestTitle,
      artistId: request.artistId,
      clientId: request.clientId,
    });
    refetchRequests();
  };

  const editRequest = async (requestId, approval) => {
    await updateRequestInDB(requestId, approval);
    refetchRequests();
  };

  useEffect(() => {
    refetchRequests();
  }, [loggedIn]);

  return (
    <RequestsContext.Provider
      value={{
        requests,
        addRequest,
        editRequest,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequestsContext = () => {
  const context = useContext(RequestsContext);
  return {
    requests: context.requests,
    addRequest: context.addRequest,
    editRequest: context.editRequest,
  };
};
