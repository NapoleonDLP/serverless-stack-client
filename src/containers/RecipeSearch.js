import React, { useState } from "react";
// import sampleRecipes from "../mocks/recipes.js";
import "./RecipeSearch.css";
import { Grid , Thumbnail, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  var retrieveRecipes = async function(keywords) {
    return await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${keywords}&addRecipeInformation=true&number=9&instructionsRequired=true&fillIngredients=true&addRecipeNutrition=true`)
    .then((data) => data.json())
    .then((recipes) => {
      console.log("Searched data:", recipes.results)
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
        <input id="keyword-search" placeholder="&#xF002; Search Thousands of Delightful Recipes" className="fontAwesome" onChange={handleInputChange} type="text" name></input>
      </form>

      <Grid>
        <Row>
          {recipes.map((recipe, i) => {
            return (
              <Col xs={6} md={4}>
                <Thumbnail>
                  <div key={i} onClick={() => console.log(`${recipe.title} was clicked!`)} id="recipe">
                  <Link to={{pathname:`recipes/${recipe.id}`, state: recipe}}>
                    <img className="recipe-image" alt="" src={`${recipe.image}`}></img>
                    <h3 title={recipe.title} id="recipe-title">{recipe.title}</h3>
                    {/* <small> */}
                      <h6 id="author">{`By ${recipe.creditsText}`}</h6>
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
                      </div>
                  </Link>
                  </div>
                </Thumbnail>
              </Col>
          )})}
        </Row>
      </Grid>
    </div>
  )
}
