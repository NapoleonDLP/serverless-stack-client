import React, { useState, useEffect } from "react";
import { Glyphicon } from "react-bootstrap";
import "./HeartButton.css";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";

export default function Heart (props) {
  const [ currentRecipe, setCurrentRecipe ] = useState(props.recipe);
  const [ savedRecipes, setSavedRecipes] = useState(props.savedRecipes);
  const [ saved, setSaved] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        let found = await isSaved()
        setSaved(found);
        setSavedRecipes(props.savedRecipes);
      } catch(e) {
        console.log("Error in HeartButton:", e)
        // console.log("Current", currentRecipe, "Saved:", savedRecipes)
        // onError(e)
      }
    }

    onLoad();
  });

  function isSaved() {
    var currId = currentRecipe.recipe.id === undefined ? currentRecipe.recipeId : currentRecipe.recipe.id;
    for (var i = 0; i < savedRecipes.length; i++) {
      // console.log("each saved:",savedRecipes[i].recipeId, "current:", currentRecipe.recipeId || currentRecipe.id)
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
    // setSaved(deleted.status);
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

    // setCurrentRecipe(savedRecipe);
  }

    async function handleDelete (event) {
      // event.preventDefault();
      console.log("EVENT", event)

      try {
        await deleteRecipe();
        // history.push("/")
      } catch (e) {
        console.log("ERROR:", e)
        // onError(e);
      }
    }

  async function handleSave (event) {
    // event.preventDefault();
    console.log("EVENT", event)

    try {
      await saveRecipe();
      // history.push("/")
    } catch (e) {
      console.log("ERROR:", e)
      onError(e);
    }
  }

  return (
    <div className={ saved ? "red" : "orange"}>
      <Glyphicon
        onClick={ saved ? handleDelete : handleSave }
        // onClick={logRecipe}
        bsClass="glyphicon"
        glyph="heart" />
    </div>
  )
}