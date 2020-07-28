import React /* , { useState, useEffect } */ from "react";
import sampleRecipes from "../mocks/recipes.js";
// import { useAppContext } from "../libs/contextLib";
// import { onError } from "../libs/errorLib";

export default function RecipeSearch() {
  // update state by api call
  // have a section to enter what you have in the fridge
  // const [recipes, setRecipes] = useState([]);
  // const { isAuthenticated } = useAppContext();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function onLoad() {
  //     if (!isAuthenticated) {
  //       return;
  //     }

  //     try {
  //       const recipes = await retrieveRecipes();
  //       setRecipes(recipes.results);
  //     } catch (e) {
  //       onError(e);
  //     }

  //     setIsLoading(false);
  //   }

  //   onLoad();
  // }, [isAuthenticated]);

  // var retrieveRecipes = function() {
  //   return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query="pasta"&addRecipeInformation=true&number=5`)
  //   .then((data) => data.json())
  //   // .then((recipes) => {
  //   //   setRecipes(recipes.results);
  //   // })
  // }

  // console.log("Recipes after fetch:", recipes)

  return (
    <div className="recipes">
        {sampleRecipes.map((recipe, i) => {
          return (
          <div key={i} onClick={() => console.log(`${recipe.title} was clicked!`)} className="recipe">
              <h2>{recipe.title}</h2>
              <img className="recipe-image" alt="" src={`${recipe.image}`}></img>
          </div>
        )})}
    </div>
  )
}
