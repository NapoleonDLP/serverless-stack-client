import React, { useState } from "react";
import { Glyphicon } from "react-bootstrap";
import "./HeartButton.css";

export default function Heart (props) {
  const [ saved, setSaved] = useState(false);
  // Take recipe that was clicked on
  // Save it to saved recipes list on return update saved recipes
  // render div
  var saveRecipe = function() {
    setSaved(!saved);
  }

  return (
    <div className={saved ? "red" : "orange"}>
      <Glyphicon
        onClick={ saveRecipe }
        bsClass="glyphicon"
        glyph="heart" />
    </div>
  )
}