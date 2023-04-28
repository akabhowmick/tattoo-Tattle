/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useAuthContext } from "../../providers/auth-provider";
import { useRequestsContext } from "../../providers/requests-provider";
import { useTattooTattleContext } from "../../providers/tattoo-provider";
import { RequestCard } from "./RequestCard";
import { TattooCard } from "./TattooCard";

function TattooItems({ currentTattoos, userId }) {
  return (
    <>
      {
        <div className="tattoo-grid">
          {currentTattoos?.map((tattoo) => {
            if (tattoo) {
              return (
                <TattooCard
                  class="tattoo-card"
                  key={tattoo.id}
                  tattoo={tattoo}
                  userId={userId}
                />
              );
            }
          })}
        </div>
      }
    </>
  );
}

function RequestItems({ currentRequests }) {
  return (
    <>
      {
        <div className="request-grid">
          {currentRequests?.map((request) => {
            return (
              <RequestCard
                class="request-card"
                key={request.id}
                request={request}
              />
            );
          })}
        </div>
      }
    </>
  );
}

export const Pagination = ({ currentDisplay }) => {
  const { user } = useAuthContext();
  const { requests } = useRequestsContext();
  const { tattoos } = useTattooTattleContext();

  const items = currentDisplay === "tats" ? tattoos : requests;

  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tattoos.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="pagination">
      {currentDisplay === "tats" && (
        <TattooItems currentTattoos={currentItems} userId={user.id} />
      )}
      {currentDisplay === "reqs" && (
        <RequestItems currentRequests={currentItems} />
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
