import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StarRatingDisplay from "./StarRatingDisplay";
import Button from "../../Button/Button";
import { AuthContext } from '../../../utils/AuthContext';
import "./CoffeeRecipe.css";

const CoffeeRecipe = ({ grindingSettings, litresWater, coffeeBrand, rating }) => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      {((user && user.role === 'User') || (user && user.role === 'Admin')) &&  
      <Button title="Rate brew" onClickEvent={() => navigate('/history')}/>}
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
