import React, { useState, useEffect } from "react";
import "./RecipeSearch.css";
import { Thumbnail, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import Heart from "../components/HeartButton.js";

export default function RecipeSearch(props) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
      async function onLoad() {
        try {
          await retrieveRecipes("delightful", 3);
        } catch (e) {
          console.error(e)
        }
      }

      onLoad();
    }, [isAuthenticated]);

  var retrieveRecipes = async function(keywords, resultCount = 9) {
    return await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${keywords}&addRecipeInformation=true&number=${resultCount}&instructionsRequired=true&fillIngredients=true&addRecipeNutrition=true`)
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
      <form onSubmit={handleSubmit}>
        <input title="Search Thousands of Delightful Recipes"id="keyword-search" placeholder="&#xF002; Search Thousands of Delightful Recipes" className="fontAwesome" onChange={handleInputChange} type="text" name></input>
      </form>
        <Row>
          {recipes.map((recipe, i) => {
            return (
              <Col xs={6} md={4}>
                <Thumbnail>
                  <div key={i} id="recipe">
                    <Link to={{pathname:`recipes/${recipe.id}`, state: recipe}}>
                      <img alt="" src={`${recipe.image}`}></img>
                      <h3 title={recipe.title} id="grid-recipe-title">{recipe.title}</h3>
                        <h6 className="author">{`By ${recipe.sourceName}`}</h6>
                    </Link>
                    <div className="recipe-tags">
                      <div className="each-tag">
                        <i id="clock" className="fa fa-clock-o" aria-hidden="true"></i>
                        <small id="time">{recipe.readyInMinutes}</small>
                      </div>
                      <div className="each-tag">
                        <small id="servings">{`Servings ${recipe.servings}`}</small>
                      </div>
                      <div className="each-tag">
                        <small id="calories">{`Cal ${Math.trunc(recipe.nutrition.nutrients[0].amount)}`}</small>
                      </div>
                      <div className="recipe-search-heart">
                        <Heart
                          updateSavedRecipes={props.updateSavedRecipes}
                          savedRecipes={props.savedRecipes} recipe={recipe}/>
                      </div>
                    </div>
                  </div>
                </Thumbnail>
              </Col>
          )})}
        </Row>
    </div>
  )
}
