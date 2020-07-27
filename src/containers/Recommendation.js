import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { Carousel } from 'react-bootstrap';


export default function Recommendation() {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const recipes = await retrieveRecommendedRecipes();
        setRecommendedRecipes(recipes.recipes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  var retrieveRecommendedRecipes = function() {
    return fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=5`)
    .then((data) => data.json())
  }

  return (
    <div className="recipes">
      <h2>Recommended Recipes</h2>
      <Carousel>
        {recommendedRecipes.map((recipe) => {
          return (
            <Carousel.Item>
              <img width={"100%"} height={"100%"} alt="900x500" src={`${recipe.image}`} />
            <Carousel.Caption>
              <h2 className="carousel-title">{recipe.title}</h2>
              {/* TODO: Adjust summary */}
              <p>{recipe.summary}</p>
            </Carousel.Caption>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}