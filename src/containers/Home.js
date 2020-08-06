import React, { useState, useEffect } from "react";
// import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
// import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import RecipeSearchContainer from "./RecipeSearch.js";
import RecipeRecommendation from "./Recommendation.js";
import SavedRecipes from "./SavedRecipes.js";

export default function Home() {
  const [notes, setNotes] = useState([]);
  // const [searchTerm, setSearchTerm] = useState([]);
  const { isAuthenticated } = useAppContext();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      // setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  async function loadNotes() {
    return await API.get("notes", "/notes");
  }

  function filterRecipes(notes) {
    return notes.filter((recipe) => recipe.recipe !== undefined)
  }

  // function renderNotesList(notes) {
  //   return [{}].concat(notes).map((note, i) =>
  //     i !== 0 ? (
  //       <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
  //         <ListGroupItem header={note.content ? note.content.trim().split("\n")[0] : null}>
  //           {"Created: " + new Date(note.createdAt).toLocaleString()}
  //         </ListGroupItem>
  //       </LinkContainer>
  //     ) : (
  //       <LinkContainer key="new" to="/notes/new">
  //         <ListGroupItem>
  //           <h4>
  //             <b>{"\uFF0B"}</b> Create a new note
  //           </h4>
  //         </ListGroupItem>
  //       </LinkContainer>
  //     )
  //   );
  // }

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

  // function handleInputChange(e) {
  //   let searchResults = [];

  //   for (var i = 0; i < notes.length; i++) {
  //     var lowerCaseContent = notes[i].content.toLowerCase()
  //     if (lowerCaseContent.includes(e.target.value.toLowerCase())) {
  //       searchResults.push(notes[i]);
  //     }
  //     setSearchTerm(searchResults);
  //   }
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  // }

  // function renderNotes() {
  //   return (
  //     <div className="notes">
  //       <PageHeader>Your Saved Recipes</PageHeader>
  //         <div name="search bar">
  //           <form onSubmit={handleSubmit}>
  //             <label>
  //             <input placeholder="&#xF002; Search" className="fontAwesome" onChange={handleInputChange} type="text" name ></input>
  //             </label>
  //           </form>

  //       </div>
  //       <ListGroup>
  //         {!isLoading && searchTerm.length === 0 ? renderNotesList(notes) : renderNotesList(searchTerm)}
  //       </ListGroup>
  //     </div>
  //   );
  // }

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
