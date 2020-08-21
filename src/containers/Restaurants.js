import React, {useState, useEffect} from "react";
import { API } from "aws-amplify";

export default function Restaurants(props) {
  const [ coords, setCoords ] = useState(null);
  const [ restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    async function onLoad() {
      try {
        await usersLocation();
        // let results = await retrieveRestaurants();
        // setRestaurants(results);
      } catch (e) {
        console.log("error in restaurants:", e)
      }
    }

    onLoad()

  }, []);

  async function usersLocation () {
    await navigator.geolocation.getCurrentPosition((pos) => {
      setCoords(pos.coords);
    });
  };

  async function retrieveRestaurants() {
    let results = await API.get("notes", `/restaurants?latitude=${coords.latitude}&longitude=${coords.longitude}&term=${props.recipe.title}`);
    console.log("Results:", results);
    return results;
  }

  async function updateRestaurants() {
    let update = await retrieveRestaurants();
    setRestaurants(update);
  }

  return (
    <div>
      <button onClick={updateRestaurants}>Missing an ingredient? Changed your mind about cooking tonight?</button>
      <h3>{coords ? updateRestaurants : "LOADING..."}</h3>
      <h3>{restaurants ? (restaurants.businesses.map((restaurant) => {
        return (
          <div>
            <small>{restaurant.alias}</small>
          </div>
          )})) : null}</h3>
    </div>
  )
}