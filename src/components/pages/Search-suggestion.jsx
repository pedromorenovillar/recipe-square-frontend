import React from "react";
import { useNavigate } from "react-router-dom";

export const SearchSuggestion = ({ suggestion }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${suggestion.id}`);
  };

  return (
    <div className="suggestion-result" onClick={handleClick}>
      {suggestion.title}
    </div>
  );
};
