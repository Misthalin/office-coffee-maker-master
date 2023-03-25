// Inspired by previous obligs
import React from "react";
import CoffeeInfo from "../CoffeeInfo/CoffeeInfo";
import Thermos from "../Thermos/Thermos";
import CoffeeRecipe from "../CoffeeRecipe/CoffeeRecipe";
import "./CoffeeDisplay.css";

export default function CoffeeDisplay(props) {
  const { litersWater, brewedAt, typeOfBean, grindingSettings, rating } = { ...props };
  return (
    <div className="CoffeeDisplay">
      <div className="display-container">
        <Thermos litersBrewed={litersWater} />
        <CoffeeInfo litersBrewed={litersWater} brewedAt={brewedAt} typeOfCoffee={typeOfBean} />
      </div>
      <CoffeeRecipe coffeeBrand={typeOfBean} grindingSettings={grindingSettings} litresWater={litersWater} rating={rating} />
    </div>
  );
}
