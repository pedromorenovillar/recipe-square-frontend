import React, { useEffect, useState } from "react";
import RecipeCard from "./Recipe-card";
import { getThreeRandomRecipes } from "../../helpers/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function RecipeContainer() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getThreeRandomRecipes();
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching random recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="highlights-container">
      <div className="today-highlights-header">Today's highlights</div>
      <div className="recipe-card-wrapper">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe._id}
              image={recipe.image}
              username={recipe.username}
              title={recipe.title}
              _id={recipe._id}
            />
          ))
        ) : (
          <div className="highlights-spinner-wrapper">
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        )}
      </div>
      <div className="highlights-footer">"2024 © Recipe Square. All rights reserved."</div>
    </div>
  );
}
