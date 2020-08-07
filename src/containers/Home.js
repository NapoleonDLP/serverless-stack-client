import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import "./Home.css";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import RecipeSearchContainer from "./RecipeSearch.js";
import RecipeRecommendation from "./Recommendation.js";
import SavedRecipes from "./SavedRecipes.js";

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

  function filterRecipes(notes) {
    return notes.filter((recipe) => recipe.recipe !== undefined)
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
      <RecipeRecommendation savedRecipes={filterRecipes(notes)}/>
    <div className="recipe-search-container">
      <RecipeSearchContainer savedRecipes={filterRecipes(notes)}/>
    </div>
      <div>
        {isAuthenticated ? <SavedRecipes savedRecipes={filterRecipes(notes)}/> : renderLander()}
      </div>
    </div>
    </div>
  );
}
