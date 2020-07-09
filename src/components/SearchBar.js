import React, {useState} from "react";

export default function SearchBar(props) {
  const [notes, setNotes] = useState();

  function handleInputChange(e) {
    let searchResults = [];
    let nonMatch = [];
    if (e.target.value.length === 0) {

    }

    for (var i = 0; i < props.notes.length; i++) {
      if (props.notes[i].content.includes(e.target.value)) {
        searchResults.push(props.notes[i]);
      }
    }
    setNotes(searchResults);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted",e)
    setNotes(notes)
  }

  return (
    <div>
          <form>
            {/* <button>Search</button> */}
            <label>
            <input onChange={handleInputChange} type="text" name onSubmit={handleSubmit}></input>
            </label>
            <input type="submit" value="Search" onClick= {handleSubmit}  />
          </form>
        </div>
  )
}
