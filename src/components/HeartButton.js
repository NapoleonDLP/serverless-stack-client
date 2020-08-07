import React, { useState, useEffect } from "react";
import { Glyphicon } from "react-bootstrap";
import "./HeartButton.css";
import { API } from "aws-amplify";

export default function Heart (props) {
  const [ currentRecipe ] = useState(props.recipe);
  const [ savedRecipes, setSavedRecipes] = useState(props.savedRecipes);
  const [ saved, setSaved] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        let found = await isSaved()
        setSaved(found);
        setSavedRecipes(props.savedRecipes);
      } catch(e) {
        console.error(e);
      }
    }

    onLoad();
  });

  function isSaved() {
    var currId = currentRecipe.recipe.id === undefined ? currentRecipe.recipeId : currentRecipe.recipe.id;
    for (var i = 0; i < savedRecipes.length; i++) {
      if (savedRecipes[i].recipeId === currId) {
        setSaved(true);
        return true;
      }
    }
    setSaved(false);
    return false;
  }

  async function deleteRecipe() {
    setSaved(false);
    await API.del("notes", `/notes/${currentRecipe.noteId}`);
  }

  async function saveRecipe() {
    let savedNotes = null;
    let savedImage = null;
    let recipeId = currentRecipe.id;
    let recipe = currentRecipe;
    setSaved(!saved);
    await API.post("notes", "/saveRecipe", {
      body: {savedNotes, savedImage, recipeId, recipe}
    })
  }

    async function handleDelete (event) {
      try {
        await deleteRecipe();
      } catch (e) {
        console.error(e);
      }
    }

  async function handleSave (event) {
    try {
      await saveRecipe();
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={ saved ? "red" : "orange"}>
      <Glyphicon
        onClick={ saved ? handleDelete : handleSave }
        bsClass="glyphicon"
        glyph="heart" />
    </div>
  )
}
