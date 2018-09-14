import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';

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
  }
  
`
const PinkDiv = styled('div')`
  color: pink;
`
const item = (props) => {
  return (
    <div className={itemcontainer} onClick={() => props.clicked(props.info)}>
      <div className={imgcontainer}>
        <img src={"http://localhost:1337" + props.info.images[0].url} alt=""/>
      </div>
      <div>
        <p>{props.info.name}</p>
        <PinkDiv>${props.info.price}</PinkDiv>
      </div>
    </div>
  )
}

export default item;