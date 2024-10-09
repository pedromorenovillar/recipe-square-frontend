import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../helpers/API";
import Navbar from "../Navbar";
import draftToHtml from "draftjs-to-html";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeById(id)
      .then((response) => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the recipe data:", error);
      });
  }, [id]);

  if (!recipe && loading)
    return (
      <div className="spinner-wrapper">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );

  const { title, image, instructions, ingredients } = recipe;

  const convertedInstructions =
    instructions && instructions.blocks
      ? draftToHtml({
          blocks: instructions.blocks,
          entityMap: instructions.entityMap,
        })
      : "";

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="recipe-grid">
        <div className="left-column">
          <div className="recipe-title">{title}</div>
          <div className="recipe-image">
            {image ? (
              <img src={image} alt={title} />
            ) : (
              <img src="https://placehold.co/150?text=No+image&font=raleway" />
            )}
          </div>
          <div className="recipe-instructions">
            <div dangerouslySetInnerHTML={{ __html: convertedInstructions }} />
          </div>
        </div>
        <div className="right-column">
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>{item.ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
