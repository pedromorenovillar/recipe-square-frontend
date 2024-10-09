import React, { useState, useContext, useEffect } from "react";
import { getAllRecipesFromUser } from "../../helpers/API";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import RecipeItem from "../recipe/Recipe-item";
import { AuthContext } from "../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function RecipeManager() {
  const { user_id } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.editMessage) {
      setEditMessage(location.state.editMessage);

      setTimeout(() => {
        setEditMessage("");
      }, 3000);
    }
    if (user_id) {
      getAllRecipesFromUser(user_id)
        .then((response) => {
          setRecipes(response.data.recipes);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
          setLoading(false);
        });
    }
  }, [user_id]);

  const handleRecipeDelete = (id, title) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe._id !== id)
    );
    setDeleteMessage(`The recipe "${title}" has been deleted successfully.`);

    window.scrollTo(0, 0);

    setTimeout(() => {
      setDeleteMessage("");
    }, 3000);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="flex-wrapper">
        {deleteMessage && <h2 className="success-message">{deleteMessage}</h2>}
        {editMessage && <h2 className="success-message">{editMessage}</h2>}

        {loading ? (
          <div className="spinner-wrapper">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeItem
              key={recipe._id}
              title={recipe.title}
              image={recipe.image}
              _id={recipe._id}
              onDelete={() => handleRecipeDelete(recipe._id, recipe.title)}
            />
          ))
        ) : (
          <h1>No recipes found.</h1>
        )}
      </div>
      <Link to="/add-recipe">
        <button className="add-recipe-btn">
          <FontAwesomeIcon icon={faSquarePlus} /> Add Recipe
        </button>
      </Link>
    </div>
  );
}
