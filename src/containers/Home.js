import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import "./Home.css";
import { Thumbnail, Col, Row} from "react-bootstrap";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import RecipeSearchContainer from "./RecipeSearch.js";
import RecipeRecommendation from "./Recommendation.js";
import Heart from "../components/HeartButton.js";
import "./SavedRecipes.css";


export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        console.error(e)
      }
    }

    onLoad();
  }, [isAuthenticated]);

  async function loadNotes() {
    return await API.get("notes", "/notes");
  }

  function updateSavedRecipes(currentRecipe, isSaved) {
    let filteredRecipes = notes.filter((recipe) => recipe.noteId !== currentRecipe.noteId);

    isSaved ? setNotes(filteredRecipes) : setNotes(notes.concat([currentRecipe]))
  }

  function renderSavedRecipes() {
    return (
      <Row>
        <h2>Your Saved Recipes</h2>
        {notes.length === 0 ? <h4>Don't forget to heart those delightful recipes!</h4> : null}
          {notes.map((recipe, i) => {
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
                        <button className="heart-button" onClick={updateSavedRecipes}>
                          <Heart renderSavedRecipes={renderSavedRecipes} updateSavedRecipes={updateSavedRecipes} savedRecipes={notes} recipe={recipe}/>
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

  function filterRecipes(notes) {
    return notes.filter((recipe) => recipe.recipe !== undefined)
  }

  function updateSavedNotes(newNote) {
    setNotes(notes.concat([newNote]));
    renderSavedRecipes();
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Delightful</h1>
        <p>Collect your favorite Delightful recipes</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
    <div className="Home">
      <RecipeRecommendation
        updateSavedRecipes={updateSavedRecipes}
        updateSavedNotes={updateSavedNotes}
        savedRecipes={filterRecipes(notes)
        }/>
    <div className="recipe-search-container">
      <RecipeSearchContainer
        updateSavedRecipes={updateSavedRecipes}
        updateSavedNotes={updateSavedNotes}
        savedRecipes={filterRecipes(notes)}
        />
    </div>
      <div>
        {isAuthenticated ?  renderSavedRecipes() : renderLander()}
      </div>
    </div>
    </div>
  );
}
