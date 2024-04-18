import React, { useState } from 'react';
import {Rating} from 'react-simple-star-rating'; 

const StarRating = ({ rating, color, onChange }) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  const handleStarHover = (starValue) => {
    setHoveredStar(starValue);
  };

  const handleStarClick = (starValue) => {
    onChange(starValue);
  };

  return (
    <div className='App'>
      <Rating
        onClick={handleStarClick}
        onMouseEnter={handleStarHover}
        onMouseLeave={() => setHoveredStar(null)}
        ratingValue={hoveredStar || rating}
        size={20}
        fillColor={color}
        emptyColor='gray'
      />
      {rating}
    </div>
  );
};

export default StarRating;
