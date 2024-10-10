import React from "react";
import { useNavigate } from "react-router-dom";

const ResultItem = ({ title, image, _id }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/recipe/${_id}`);
  };

  return (
    <div className="result-wrapper" onClick={handleView}>
      <div className="result-thumbnail">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <img src="https://placehold.co/150?text=No+image&font=raleway" />
        )}
      </div>
      <div className="result-title-wrapper">
        <div className="result-title">{title}</div>
      </div>
    </div>
  );
};

export default ResultItem;
