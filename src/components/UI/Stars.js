import React from 'react';

const stars = (props) => {
  let numberOfStars = [];
  for (let i = 0; i < props.rating; i++ ) {
    numberOfStars.push(<span key={i}>&#x2605;</span>);
  }
  return (
    <div>
      {numberOfStars}
    </div>
  )
}

export default stars;