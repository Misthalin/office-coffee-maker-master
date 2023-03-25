import React from "react";
import StarRatingDisplay from "../../components/Coffee/CoffeeRecipe/StarRatingDisplay";
import Button from "../../components/Button/Button";
import "./CoffeeRecipe.css";

const CoffeeRecipe = ({ grindingSettings, litresWater, coffeeBrand, rating }) => {
  return (
    <div className="CoffeeRecipe">
      <h2 className="text-center text-black">Recipe</h2>
      <ul className="recipe-list">
        <li className="recipe--item">
          <span className="text-light">Coffee</span>
          <span className="text-bold">{coffeeBrand}</span>
        </li>

        <li className="recipe--item">
          <span className="text-light">Grinding setting</span>
          <span className="text-bold">{grindingSettings}</span>
        </li>

        <li className="recipe--item">
          <span className="text-light">Water</span>
          <span className="text-bold">{litresWater}</span>
        </li>
      </ul>
      <div className="rating">
        <StarRatingDisplay ratingValue={rating} />
        <Button title="Rate brew" />
      </div>
    </div>
  );
};

CoffeeRecipe.defaultProps = {
  grindingSettings: 7,
  litresWater: 1.5,
  coffeeBrand: "Unknown",
  rating: 1,
};

export default CoffeeRecipe;
