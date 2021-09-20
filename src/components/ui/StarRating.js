import React from "react";
import { FaStar } from "react-icons/fa";

function getStars(value) {
  let stars = [];

  for (let i = 1; i < 6; i++) {
    if (i <= value) {
      stars.push(<FaStar color="#ffd043" />);
    } else {
      stars.push(<FaStar color="grey" />);
    }
  }
  return stars;
}

function StarRating({ value }) {
  return (
    <div>
      {getStars(value).map((star) => {
        return star;
      })}
    </div>
  );
}

export default StarRating;
