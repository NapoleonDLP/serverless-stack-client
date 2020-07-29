import React from "react";
import { useHistory } from "react-router-dom";
import { Badge, Panel, ListGroup, ListGroupItem } from "react-bootstrap";


export default function Recipe() {
  var history = useHistory();
  var recipe = history.location.state;

  return (
    <div>
      <Panel>
        <Panel.Heading>
          <Panel.Title><h2>{recipe.title}</h2></Panel.Title>
        </Panel.Heading>

        <Panel.Body>
          <div>
            <img alt={recipe.title} src={`${recipe.image}`}></img>
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
                {recipe.analyzedInstructions[0].steps.map((instruction, i) => {
                  return(
                    <ListGroupItem key={i}>
                      {`Step ${i +1}: ${instruction.step}`}
                    </ListGroupItem>
                  )
                })}
              </ListGroup>
            </Panel.Body>
            </Panel>

        </Panel.Body>

      </Panel>
      <p>
        <Badge>{recipe.aggregateLikes}</Badge> Likes
      </p>
    </div>
  )
}
