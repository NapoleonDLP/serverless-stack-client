import React from "react";
import { useHistory } from "react-router-dom";
import { Badge } from "react-bootstrap";

export default function Recipe() {
  var history = useHistory();
  var recipe = history.location.state;
  console.log("Recipe Data:", recipe)
  return (
    <div>
      <h1>{`${recipe.title}`}</h1>
      <img alt={recipe.title} src={`${recipe.image}`}></img>
      <p>{recipe.summary}</p>
      {console.log(recipe.extendedIngredients)}
      <p>
        <Badge>{recipe.aggregateLikes}</Badge> Likes
      </p>
    </div>
  )
}
