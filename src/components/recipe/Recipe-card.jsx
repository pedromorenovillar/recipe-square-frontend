import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function ({ image, username, title, _id }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/recipe/${_id}`);
  };

  return (
    <div className="recipe-card" onClick={handleView}>
      <div className="recipe-card-title">
        <h4>{title}</h4>
      </div>
      <div
        className="recipe-card-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <FontAwesomeIcon icon={faEye} className="eye-icon" />
      </div>
      <div className="recipe-card-username">({username})</div>
    </div>
  );
}
