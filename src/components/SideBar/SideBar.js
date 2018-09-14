import React from 'react';
import { css } from 'emotion';

const sidebarContainer = css`
  border: 1px solid #bfbfbf;
  padding: 10px;
  ul {
    list-style: none;
    text-transform: Capitalize;
    padding: 0;
  }
  li {
    padding-bottom: 10px;
    color: black;
  }
`
const sideBar = (props) => {
  let category = props.categories.map((cat, index) => {
    return <li key={index}>{cat}</li>
  })
  return (
    <div className={sidebarContainer}>
      <h4>Shop Drones and Accessories</h4>
      <ul>
        {category}
      </ul>
    </div>
  )
}

export default sideBar;