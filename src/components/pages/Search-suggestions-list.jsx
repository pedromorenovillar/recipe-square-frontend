import React from "react";
import { SearchSuggestion } from "./Search-suggestion";

export const SearchSuggestionsList = ({ suggestions }) => {
  return (
    <div className="suggestions-list">
      {suggestions.length > 0 &&
        suggestions.map((suggestion) => {
          return (
            <SearchSuggestion suggestion={suggestion} key={suggestion.id} />
          );
        })}
    </div>
  );
};
