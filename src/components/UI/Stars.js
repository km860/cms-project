import React from 'react';
import { css } from 'react-emotion';

const container = css`
  padding: 0 10px;
`

const stars = (props) => {
  let numberOfStars = [];
  for (let i = 0; i < props.rating; i++ ) {
    numberOfStars.push(<span key={i}>&#x2605;</span>);
  }
  return (
    <div className={container}>
      {numberOfStars}
    </div>
  )
}

export default stars;