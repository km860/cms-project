import React from 'react';
import { css } from 'emotion';

const sidebarContainer = css`
  
  border: 1px solid #bfbfbf;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #000000ba;
  color: white;
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
    color: white;
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
  const sortStock = ['High', 'Low'];
  let sortByStock = sortStock.map(val => {
    return <li key={val} onClick={() => props.sortStock(val)}>{val}</li>
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
        <h4>Sort By In Stock</h4>
        <ul>
          {sortByStock}
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