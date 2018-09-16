import React from 'react';
import { css } from 'react-emotion';

const bar = css`
  width: 100%;
  padding: 10px;

  img {
    width: 24px;
  }
  span {
    padding: 10px;
    line-height: 100%;
    vertical-align: super;
  }
`
const navbar = (props) => {
  return (
    <div className={bar}>
      <div>
        <img src={ require('../../assets/online-shopping-cart.png') } alt=""/>
        <span>(0)</span>
      </div>
    </div>
  )
}

export default navbar