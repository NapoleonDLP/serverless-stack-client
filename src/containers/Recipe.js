import React from "react";
import { useHistory } from "react-router-dom";

export default function Recipe() {
  var history = useHistory();
  var recipe = history.location.state;
  return (
    <div>
      <h1>{`${recipe.title}`}</h1>
      <img alt={recipe.title} src={`${recipe.image}`}></img>
      <p>{recipe.summary}</p>
      {console.log(recipe.extendedIngredients)}
    </div>
  )
}
