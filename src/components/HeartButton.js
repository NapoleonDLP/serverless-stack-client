import React, { useState, useEffect } from "react";
import { Glyphicon } from "react-bootstrap";
import "./HeartButton.css";
import { API } from "aws-amplify";

export default function Heart (props) {
  const [ currentRecipe ] = useState(props.recipe);
  const [ savedRecipes, setSavedRecipes] = useState(props.savedRecipes);
  const [ saved, setSaved] = useState();

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
    var currId = currentRecipe.id === undefined ? currentRecipe.recipeId : currentRecipe.id;
    for (var i = 0; i < savedRecipes.length; i++) {
      if (savedRecipes[i].recipeId === currId) {
        setSaved(true);
        return true;
      }
    }
    setSaved(false);
    console.log("isSaved = false", currId);
    return false;
  }

  async function deleteRecipe() {
    setSaved(false);
    await API.del("notes", `/notes/${currentRecipe.noteId}`);
    if (props.updateSavedRecipes) {
      props.updateSavedRecipes(currentRecipe, saved);
    }
  }

  async function saveRecipe() {
    let savedNotes = null;
    let savedImage = null;
    let recipeId = currentRecipe.id;
    let recipe = currentRecipe;
    const updatedRecipe = await API.post("notes", "/saveRecipe", {
      body: {savedNotes, savedImage, recipeId, recipe}
    })

    if (props.updateSavedRecipes) {
      props.updateSavedRecipes(updatedRecipe, saved);
    }
    setSaved(true);
  }

    async function handleDelete (event) {
      console.log("Handle Delete Props:",props);
      try {
        await deleteRecipe();
      } catch (e) {
        console.error(e);
      }
    }

  async function handleSave (event) {
    console.log("Handle Save Props:",props)
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
