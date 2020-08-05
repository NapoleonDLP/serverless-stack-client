import React from "react"
import { useHistory } from "react-router-dom";
import { Badge, Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Recipe.css";
import Heart from "../components/HeartButton.js";

export default function Recipe() {
  var history = useHistory();
  var recipe = history.location.state;

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
                <Heart recipe={recipe}/>
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
