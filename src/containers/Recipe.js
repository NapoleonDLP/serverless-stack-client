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

  function renderTags() {
    const tags = [
      ["Budget Meal", "cheap"],
      ["Dairy Free", "dairyFree"],
      ["Gluten Free", "glutenFree"],
      ["Vegan", "vegan"],
      ["Vegetarian", "vegetarian"],
      ["Popular", "veryPopular"]
    ]
      console.log(recipe)
      return tags.map((tag, i) => {
        console.log(i, recipe[tag[1]])
        let color = recipe[tag[1]] ? "orange" : "grey";
        console.log("COLOR", color)
        return (
          recipe[tag[1]] ? <p className={`tags tags-each ${color}`}>{tag[0]}</p> : null
        )
      })
  }

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
            <div id="recipe-info">
              <h6 id="recipe-author" className="author">{`${recipe.sourceName}`}</h6>
              <Panel.Title><h2 id="recipe-title">{recipe.title}</h2></Panel.Title>
              <p id="summary">{recipe.summary.replace(/(<([^>]+)>)/ig, '')}</p>
            </div>

            <div id="recipe-image">
              <div id="recipe-heart">
                <Heart savedRecipes={savedRecipes} recipe={recipe}/>
              </div>
              <img width={"100%"} height={"100%"} alt={recipe.title} src={`${recipe.image}`}></img>
            </div>
          </div>

          <div className="tags-container">
            {renderTags()}
          <div className="likes-box tags-each" id="likes">
            <Badge className="aggregateLikes">{recipe.aggregateLikes}</Badge>
            <p className="aggregateLikes">Likes</p>
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

      </Panel>
  )
}
