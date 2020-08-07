import React, {useState, useEffect} from "react";
// import axios from "axios";
import { API } from "aws-amplify";

export default function Restaurants(props) {
  // const recipe = props.recipe;
  const [ restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function onLoad() {
      try {
        let results = await retrieveRestaurants();
        // console.log("YELP RESULTS:", results)
        setRestaurants(results);
      } catch (e) {
        console.log("error in restaurants:", e)
      }
    }

    onLoad()
    console.log("REST:",restaurants)
  });

  function retrieveRestaurants() {
    // let latitude = 38.9399;
    // let longitude = -119.9772;
    // let term = "tacos";

    return API.post("notes", "/restaurants", {
      body: {latitude: 38.9399, longitude: -119.9772, term: "tacos"}
    });

    // const restaurants = await fetch(`https://kcif0tk0e9.execute-api.us-east-2.amazonaws.com/prod/restaurants`, {
    //   // mode: "no-cors",
    //   method: "POST",
    //   body: JSON.stringify(data)
    // })
    // .then((data) => data.json())
    // .then((data) => console.log("YELP RESULTS:", data))
    // .catch((err) => console.log("ERROR:",err))
  }

  return (
    <div>
      <button onClick={retrieveRestaurants}>YELP</button>
      <h3>CHECK THESE OUT</h3>
    </div>
  )
}