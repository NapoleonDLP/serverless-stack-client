import React, { useState, useEffect } from "react";
import { Thumbnail, Col, Row} from "react-bootstrap";
import Heart from "../components/HeartButton.js";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import "./SavedRecipes.css";

export default function SavedRecipes() {
  const [ savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    async function onLoad() {
      try {
        let notes = await loadNotes();
        setSavedRecipes(filterRecipes(notes));
      } catch (e) {
        console.error(e)
      }
    }

    onLoad();
  }, [])

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function filterRecipes(notes) {
    return notes.filter((recipe) => recipe.recipe !== undefined)
  }

  function updateSavedRecipes(currentRecipe) {
    let filteredRecipes = savedRecipes.filter((recipe) => recipe.noteId !== currentRecipe.noteId);
    setSavedRecipes(filteredRecipes);
  }

  return (
    <Row>
      <h2>Your Saved Recipes</h2>
      {savedRecipes.length === 0 ? <h4>Don't forget to heart those delightful recipes!</h4> : null}
        {savedRecipes.map((recipe, i) => {
          return recipe.recipe ? (
            <Col xs={6} md={4}>
              <Thumbnail>
                <div key={i} id="recipe">
                  <Link to={{pathname:`recipes/${recipe.recipe.id}`, state: recipe.recipe}}>
                    <img alt="" src={`${recipe.recipe.image}`}></img>
                    <h3 title={recipe.recipe.title} id="grid-recipe-title">{recipe.recipe.title}</h3>
                      <h6 className="author">{`By ${recipe.recipe.sourceName}`}</h6>
                  </Link>
                  <div className="recipe-tags">
                    <div className="each-tag">
                      <i id="clock" className="fa fa-clock-o" aria-hidden="true"></i>
                      <small id="time">{recipe.recipe.readyInMinutes}</small>
                    </div>
                    <div className="each-tag">
                      <small id="servings">{`Servings ${recipe.recipe.servings}`}</small>
                    </div>
                    <div className="each-tag">
                      <small id="calories">{recipe.recipe.nutrition ? `Cal ${Math.trunc(recipe.recipe.nutrition.nutrients[0].amount)}` : "Cal 150"}</small>
                    </div>
                    <div className="recipe-search-heart">
                      <button className="heart-button" onClick={() => updateSavedRecipes(recipe)}>
                        <Heart savedRecipes={savedRecipes} recipe={recipe}/>
                      </button>
                    </div>
                  </div>
                </div>
              </Thumbnail>
            </Col>
        ) : null
        })}
    </Row>
  )
}
