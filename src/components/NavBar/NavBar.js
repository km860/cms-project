import React from 'react';
import { Link } from 'react-router-dom'
import { css } from 'react-emotion';

const bar = css`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: end;

  img {
    width: 24px;
  }
  span {
    padding: 10px;
    line-height: 100%;
    vertical-align: super;
  }
  a {
    text-decoration: none;
  }
`
const navbar = (props) => {
  return (
    <div className={bar}>
      <div>
        <Link to='/'><span>Home</span></Link>
      </div>
      <Link to='/checkout'>
        <div>
          <img src={ require('../../assets/online-shopping-cart.png') } alt=""/>
          <span>( {props.inCart} )</span>
        </div>
      </Link>
    </div>
  )
}

export default navbar