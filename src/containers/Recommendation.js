import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Recommendation.css";
import Heart from "../components/HeartButton.js";


export default function Recommendation() {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const { isAuthenticated } = useAppContext();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      //TODO: Fix bug that allows for recommendation even when not authorized
      // if (!isAuthenticated) {
      //     return;
      //   }

        try {
          const recipes = await retrieveRecommendedRecipes();
          console.log("List of recipes:", recipes.recipes)
          setRecommendedRecipes(recipes.recipes);
        } catch (e) {
          onError(e);
        }

        // setIsLoading(false);
      }

      onLoad();
      }, [isAuthenticated]);

      var retrieveRecommendedRecipes = async function() {
        return await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=5`)
        .then((data) => data.json())
      }


    return (
      <div className="recipes">
      <h2>Recommended Recipes</h2>
      <Carousel>
        {recommendedRecipes.map((recipe, i) => {
          if (recipe.image) {
            return (
              <Carousel.Item key={i}>
                <Link to={{pathname:`recipes/${recipe.id}`, state: recipe}}>
                  <div className="carousel-image">
                    <img width={"100%"} height={"100%"} alt="900x500" src={`${recipe.image}`} />
                  </div>
                </Link>
                  <Carousel.Caption>
                <div id="caption">
                    <h2 className="carousel-title">{recipe.title}</h2>
                    <div className="recipe-tags">
                        <div className="each-tag">
                          <i id="clock" className="fa fa-clock-o" aria-hidden="true"></i>
                          <small id="time">{recipe.readyInMinutes}</small>
                        </div>
                        <div className="each-tag">
                          <small id="servings">{`Servings ${recipe.servings}`}</small>
                        </div>
                        <div className="each-tag">
                          <small id="calories">{`Cal 150`}</small>
                        </div>
                        {/* <div className="each-tag">
                        </div> */}
                        <div id="carousel-tag-heart">
                          <Heart recipe={recipe}/>
                        </div>
                      </div>
                </div>
                  </Carousel.Caption>
                </Carousel.Item>
            )
          } else {
            return null;
          }
        })}
      </Carousel>
    </div>
  )
}