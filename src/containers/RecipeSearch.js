import React, { useState, useEffect } from "react";
// import sampleRecipes from "../mocks/recipes.js";
import "./RecipeSearch.css";
// import { Grid } from "react-bootstrap";

export default function RecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  var retrieveRecipes = async function(keywords) {
    return await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${keywords}&addRecipeInformation=true&number=9`)
    .then((data) => data.json())
    .then((recipes) => {
      setRecipes(recipes.results);
    })
  }

  function handleInputChange(e) {
    setSearchTerm(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Handle Submit: Ran')
    retrieveRecipes(searchTerm);
  }

  return (
    <div className="search-recipes">
      <h2>Search Your Favorite Recipes</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input id="keyword-search" placeholder="&#xF002; Keywords" className="fontAwesome" onChange={handleInputChange} type="text" name></input>
        </label>
      </form>
        {recipes.map((recipe, i) => {
          return (

          <div key={i} onClick={() => console.log(`${recipe.title} was clicked!`)} className="recipe">
              <h2>{recipe.title}</h2>
              <img className="recipe-image" alt="" src={`${recipe.image}`}></img>
          </div>

          )
        })}
    </div>
  )
}
