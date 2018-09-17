import React from 'react';
import styled, { css } from 'react-emotion';
import { NavLink } from 'react-router-dom'
const imgcontainer = css`
  width: 200px;
  img {
    width: 100%;
  }
`
const itemcontainer = css`
  
  display: flex;
  flex-direction: column;
  /* border: 1px solid #41404033; */
  padding: 10px;
  margin: 10px;
  width: 250px;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  border-radius: 2px;
  box-shadow: 0px 2px 8px #5d5d5d33;
  transition: box-shadow 0.1s ease-in;
  &:hover {
    box-shadow: 0 2px 14px grey;
    cursor: pointer;
  }
  
`
const PinkDiv = styled('div')`
  color: hotpink;
  padding: 10px;
`
const item = (props) => {
  return (
    <NavLink to={`/product/${props.info._id}`}>
      <div className={itemcontainer}>
        <div className={imgcontainer}>
          <img src={"http://localhost:1337" + props.info.images[0].url} alt=""/>
        </div>
        <div>
          <p>{props.info.name}</p>
          <PinkDiv>${props.info.price}</PinkDiv>
        </div>
      </div>
    </NavLink>
  )
}

export default item;