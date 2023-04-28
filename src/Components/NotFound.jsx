import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h2>Page not found</h2>
      <p>Go to <Link to='/'>Home</Link></p>
    </div>
  );
};
