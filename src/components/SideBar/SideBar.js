import React from 'react';
import { css } from 'emotion';

const sidebarContainer = css`
  
  border: 1px solid #bfbfbf;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  h4 {
    margin-bottom: 5px;
    border-bottom: 1px solid grey;
  }
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
    return <li key={index} onClick={() => props.filterCat(cat)}>{cat}</li>
  })

  const sortPrice = ['High', 'Low'];
  let sortByPrice = sortPrice.map(val => {
    return <li key={val} onClick={() => props.sortPrice(val)}>{val}</li>
  })

  return (
    <div className={sidebarContainer}>
      <div>
        <h4 onClick={props.clickReset}>Shop Drones and Accessories</h4>
        <ul>
          {category}
        </ul>
      </div>
      <div>
        <h4>Sort By Price</h4>
        <ul>
          {sortByPrice}
        </ul>
      </div>
    </div>
  )
}

export default sideBar;