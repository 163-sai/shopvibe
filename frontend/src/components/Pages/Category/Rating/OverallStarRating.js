import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const OverallStarRating = ({ color }) => {
  const [randomRating, setRandomRating] = useState(null);

  useEffect(() => {
    const rating = (Math.random() * (4.5 - 3.5) + 3.5).toFixed(1);
    setRandomRating(rating);

    
    return () => setRandomRating(null);
  }, []);

  const filledStars = Math.floor(randomRating);

  const starIcons = Array.from({ length: filledStars }, (_, index) => (
    <FontAwesomeIcon key={index} icon={solidStar} style={{ color }} />
  ));

  return (
    <div style={{ backgroundColor: 'grey', padding: '5px', borderRadius: '5px',width:'fit-content' }}>
      <div>{starIcons}{randomRating}</div>
    </div>

  );
};



export default OverallStarRating;









