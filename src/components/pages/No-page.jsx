import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

export default function () {
  return (
    <div className="page-wrapper">
      <div className="flex-wrapper">
        <FontAwesomeIcon icon={faFaceFrown} style={{ fontSize: "3em" }} />
        <h1>The page could not be found</h1>
        <Link to="/">
          <button className="basic-btn">Return to the homepage</button>
        </Link>
      </div>
    </div>
  );
}
