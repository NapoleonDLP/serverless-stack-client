import React from "react";
import five from "../assets/small_5@3x.png";
import fourHalf from "../assets/small_4_half@3x.png";
import four from "../assets/small_4@3x.png";
import threeHalf from "../assets/small_3_half@3x.png";
import three from "../assets/small_3@3x.png";
import twoHalf from "../assets/small_2_half@3x.png";
import two from "../assets/small_2@3x.png";
import oneHalf from "../assets/small_1_half@3x.png"
import one from "../assets/small_1@3x.png";
import zero from "../assets/small_0@3x.png";

export default function YelpStars (rating) {

  const ratings = {
    "0": zero,
    "1": one,
    "1.5": oneHalf,
    "2": two,
    "2.5": twoHalf,
    "3": three,
    "3.5": threeHalf,
    "4": four,
    "4.5": fourHalf,
    "5": five
  }

  return (
    <img alt="Rating Not Found" src={ratings[rating]}/>
  )
}