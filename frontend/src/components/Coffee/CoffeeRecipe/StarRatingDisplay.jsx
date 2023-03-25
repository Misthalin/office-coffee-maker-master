import React from "react";
import ReactStars from "react-rating-stars-component";
import {ReactComponent as FullStar} from "../../../assets/icons/FullStar.svg";
import {ReactComponent as EmptyStar} from "../../../assets/icons/EmptyStar.svg";
import {ReactComponent as HalfStar} from "../../../assets/icons/HalfStar.svg";

const StarRatingDisplay = ({ ratingValue }) => {
  return (
    <ReactStars
      value={ratingValue}
      edit={false}
      filledIcon={<FullStar />}
      halfIcon={<HalfStar />}
      emptyIcon={<EmptyStar />}
    />
  );
};

export default StarRatingDisplay;
