import React, {useState, useEffect} from "react";
import { API } from "aws-amplify";
import "./Restaurants.css";

export default function Restaurants(props) {
  const [ coords, setCoords ] = useState(null);
  const [ restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    async function onLoad() {
      try {
        await usersLocation();
      } catch (e) {
        console.log("error in restaurants:", e)
      }
    }

    onLoad()

  }, []);

  useEffect(() => {
    async function whenCoords() {
      try {
        let results = await retrieveRestaurants();
        setRestaurants(results);
      } catch (e) {
        console.log("error in restaurants:", e);
      }
    }

    whenCoords();

  }, coords)

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

  return (
    <div>
    <h3>Missing ingredients? Too tired to cook?</h3>
    <h3>Heart this recipe for later and give these local establishments a shot!</h3>
      {restaurants ? (
        restaurants.businesses.map((restaurant) => {
        return (
          <div className="restaurants_container">
            <img id="restaurant_img" alt="" src={restaurant.image_url}></img>
            <div className="restaurant_tags">
              <p>{restaurant.name}</p>
              <p><a href={"tel:" + restaurant.phone}>{restaurant.display_phone}</a></p>
              <p>{restaurant.is_closed ? "Open" : "Closed"}</p>
              <p>{restaurant.price}</p>
              <p>{restaurant.rating}</p>
              <p>{restaurant.review_count + " reviews"}</p>
            </div>
          </div>
          )})) : "Loading local favorites"}
    </div>
  )
}
