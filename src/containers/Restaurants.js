import React, {useState, useEffect} from "react";
import { API } from "aws-amplify";
import "./Restaurants.css";
import YelpStars from "../components/YelpStars.js";
import { Panel } from "react-bootstrap"

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

    async function retrieveRestaurants() {
      let results = await API.get("notes", `/restaurants?latitude=${coords.latitude}&longitude=${coords.longitude}&term=${props.recipe.title}`);
      console.log("Results:", results);
      return results;
    }

    async function whenCoords() {
      try {
        let results = await retrieveRestaurants();
        setRestaurants(results);
      } catch (e) {
        console.log("error in restaurants:", e);
      }
    }

    whenCoords();

  }, [coords, props.recipe.title])

  async function usersLocation () {
    await navigator.geolocation.getCurrentPosition((pos) => {
      setCoords(pos.coords);
    });
  };



  return (
    <Panel>
      <Panel.Body>
        <div className="restaurants_component">
        <h3>Missing ingredients? Too tired to cook?</h3>
        {restaurants ? (<h5>Heart this recipe for later and give these local establishments a shot!</h5>) : null}
          {restaurants ? (
            restaurants.businesses.map((restaurant, i) => {
            return (
              <Panel>
                <a id="restaurant_link" href={restaurant.url}>
                  <div className="restaurants_container">
                    <img id="restaurant_img" alt="" src={restaurant.image_url}></img>
                    <div className="restaurant_tags">
                      <p id="restaurant_name">{(i+1) + '. ' + restaurant.name}</p>
                      <p><a href={"tel:" + restaurant.phone}>{restaurant.display_phone}</a></p>
                      <p>{restaurant.is_closed ? "Open" : "Closed"}</p>
            <p>{restaurant.price} • {restaurant.categories.map((category, i) => (i+1 < restaurant.categories.length) ? (category.title + ", ") : category.title)}</p>
                      <div>{YelpStars(restaurant.rating)}</div>
                      <p>{restaurant.review_count + " reviews"}</p>
                    </div>
                  </div>
                </a>
              </Panel>
              )})) : "Loading local favorites"}
        </div>
      </Panel.Body>
    </Panel>
  )
}
