import React from "react";
import CoffeeInfo from "../../components/Coffee/CoffeeInfo/CoffeeInfo";
import Thermos from "../../components/Coffee/Thermos/Thermos";
import CoffeeRecipe from "../CoffeeRecipe/CoffeeRecipe";
import "./CoffeeDisplay.css";

export default function CoffeeDisplay(props) {
  const { litersWater, brewedAt, typeOfBean, litresWater, grindingSettings, rating } = { ...props };
  return (
    <div className="CoffeeDisplay">
      <div className="display-container">
        <Thermos litersBrewed={litersWater} />
        <CoffeeInfo litersBrewed={litersWater} brewedAt={brewedAt} typeOfCoffee={typeOfBean} />
      </div>
      <CoffeeRecipe coffeeBrand={typeOfBean} grindingSettings={grindingSettings} litresWater={litresWater} rating={rating} />
    </div>
  );
}
