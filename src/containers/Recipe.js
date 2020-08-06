import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { Badge, Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Recipe.css";
import Heart from "../components/HeartButton.js";
import { API } from "aws-amplify";

export default function Recipe(props) {
  var history = useHistory();
  var recipe = history.location.state;
  const [ savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    async function onLoad() {
      try {
        let notes = await loadNotes();
        setSavedRecipes(filterRecipes(notes));

      } catch (e) {
        // onError(e);
        console.log("Error in Saved Recipe:", e)
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

  console.log("Saved from RECIPE", savedRecipes)
  return (
      <Panel className="recipe-panel">
        <Panel.Body>
          <div className="title-image">
            <div id="recipe-title">
              <Panel.Title><h2>{recipe.title}</h2></Panel.Title>
              <h6 className="author">{`By ${recipe.sourceName}`}</h6>
              <p id="summary">{recipe.summary.replace(/(<([^>]+)>)/ig, '')}</p>
            </div>

            <div id="recipe-image">
              <div id="recipe-heart">
                <Heart savedRecipes={savedRecipes} recipe={recipe}/>
              </div>
              <img width={"100%"} height={"100%"} alt={recipe.title} src={`${recipe.image}`}></img>
            </div>
          </div>

          <Panel>
            <Panel.Heading>
              <Panel.Title toggle><h3>Ingredients</h3></Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <ListGroup>
                {recipe.extendedIngredients.map((ingredient, i) => {
                  return(
                    <ListGroupItem key={i}>{ingredient.original}</ListGroupItem>
                  )
                })}
              </ListGroup>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Heading>
              <Panel.Title toggle><h3>Instructions</h3></Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <ListGroup>
                {recipe.analyzedInstructions[0].steps.map(  (instruction, i) => {
                  return(
                    <ListGroupItem key={i}>
                      {`Step ${i +1}: ${instruction.step}`}
                    </ListGroupItem>
                  )})}
              </ListGroup>
            </Panel.Body>
          </Panel>

        </Panel.Body>

        <div className="tags-container">
          <div id="likes">
            <Badge className="aggregateLikes">{recipe.aggregateLikes}</Badge>
            <p className="aggregateLikes">Likes</p>
          </div>
            <p className="tags">Dairy free</p>
        </div>

      </Panel>
  )
}
