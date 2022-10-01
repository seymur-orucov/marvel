import React from "react";
import { Link } from "react-router-dom";

import { ErrorMessage } from "../components/errorMessage/ErrorMessage";

const Page404 = () => {
  return (
    <>
      <ErrorMessage />
      <div className="error-copy">
        <h1>404 Page Not Found</h1>
        <h4 className="dynamic-msg"></h4>
        <Link to="/" style={{ marginTop: "30px", fontWeight: "bold" }}>
          Back to home page
        </Link>
      </div>
    </>
  );
};

export default Page404;
