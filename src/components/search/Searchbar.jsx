import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchRecipes } from "../../helpers/API";
import { SearchSuggestionsList } from "../pages/Search-suggestions-list";

const Searchbar = ({ onSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const searchKey = watch("searchKey", "");

  useEffect(() => {
    if (searchKey.trim() !== "") {
      searchRecipes(searchKey)
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchKey]);

  const onSubmit = (data) => {
    navigate(`/results/${data.searchKey}`);
  };

  return (
    <div>
      <div className="searchbar-container">
        <form className="searchbar-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className={errors.searchKey ? "searchbar-error" : "searchbar"}
            placeholder={
              errors.searchKey ? "Please enter a term" : "Search recipes..."
            }
            {...register("searchKey", { required: true })}
          />
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="search-suggestions-list">
        <SearchSuggestionsList suggestions={suggestions} />
      </div>
    </div>
  );
};
export default Searchbar;
