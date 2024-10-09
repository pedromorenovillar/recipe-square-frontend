import React from "react";
import { deleteRecipe } from "../../helpers/API";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const RecipeItem = ({ title, image, _id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(_id)
      .then((response) => {
        if (onDelete) {
          onDelete(_id, title);
        }
      })
      .catch((error) => {
        console.error("Error deleting the recipe.", error);
      });
  };

  const handleView = () => {
    navigate(`/recipe/${_id}`);
  };

  const handleEdit = () => {
    navigate(`/edit-recipe/${_id}`);
  };

  return (
    <div className="recipe-wrapper">
      <div className="recipe-title">{title}</div>
      <div className="recipe-thumbnail">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <img src="https://placehold.co/150?text=No+image&font=raleway" />
        )}
      </div>
      <div className="recipe-btns">
        <button className="view-recipe-btn" onClick={handleView}>
          <FontAwesomeIcon icon={faEye} />
          View
        </button>
        <button className="edit-recipe-btn" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
          Edit
        </button>
        <button className="delete-recipe-btn" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeItem;
