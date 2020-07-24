import React, { useState, useEffect } from "react";
import sampleRecipes from "../mocks/recipes.js";


export default function RecipeSearch() {
  // update state by api call
  // have a section to enter what you have in the fridge
  const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  var retrieveRecipes = function() {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query="pasta"&addRecipeInformation=true&number=5`)
    .then((data) => data.json())
    .then((recipes) => {
      setRecipes(recipes.results);
    })
  }
  // });

  console.log("Recipes After Fetch:", recipes)

  return (
    <div className="recipes">
      {sampleRecipes.map((recipe) => {
        console.log("Link to image:", recipe.image)
        return (
          <div className="recipe">
            {/* <button> */}
              <h2>{recipe.title}</h2>
              <img class="recipe-image" alt="" src={`${recipe.image}`}></img>
            {/* </button> */}
          </div>
        )
      })}
    </div>
  )
}
