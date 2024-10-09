import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { searchRecipes } from "../../helpers/API";
import ResultItem from "../search/Result-item";

const Results = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { searchKey } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (searchKey) {
      searchRecipes(searchKey)
        .then((response) => {
          setRecipes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
        });
    }
  }, [searchKey]);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="flex-wrapper">
        <h2>Search results for "{searchKey}"</h2>

        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <ResultItem
              key={recipe._id}
              title={recipe.title}
              image={recipe.image}
              _id={recipe.id}
            />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;

// {recipes.length > 0 ? (
//   recipes.map((recipe) => (
//     <div key={recipe._id}>
//       <h3>{recipe.title}</h3>
//       <img src={recipe.image}></img>
//       <p>{recipe.id}</p>
//     </div>
//   ))
// ) : (
//   <p>No recipes found.</p>
// )}
