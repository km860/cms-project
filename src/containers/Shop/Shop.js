import React, { Component } from 'react'
import { connect } from 'react-redux';
import { css } from 'react-emotion';
// import { Route } from 'react-router-dom'

import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar';
import Item from '../../components/Item/Item';
import * as actions from '../../store/actions';

const listItems = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
class Shop extends Component {
  componentDidMount() {
    this.props.onInitShop()
  }

  handleClick = (selected) => {
    this.props.onChooseItem(selected)
    this.props.history.push('/product')

  }
  handleFilter = (cat) => { 
    this.props.onFilterCategory(cat);
  }

  handleSortPrice = (val) => {
    
    console.log(val)
    this.props.onSortPrice(val)
  }
  handleSortStock = (val) => {
    
    this.props.onSortStock(val)
  }

  render() {
    let productList = this.props.products.map((el, index) => {
      return <Item key={index} info={el} clicked={(selected) => this.handleClick(selected) } />
    });

    
    const categories = ['toy drones', 'camera drones', 'drone accessories'];
    return (
      <div className="Main">
        <NavBar inCart={this.props.itemsInCart}/>
        <div>
          <SideBar 
            categories={categories} 
            filterCat={(cat) => this.handleFilter(cat)}
            clickReset={this.props.onInitShop}
            sortPrice={(val) => this.handleSortPrice(val)} 
            sortStock={(val) => this.handleSortStock(val)} />
        </div>
        <div className={listItems}>
          {productList}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    chosenItem: state.selectedItem,
    itemsInCart: state.noOfItemsInCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitShop: () => dispatch(actions.initShop()),
    onChooseItem: (selected) => dispatch(actions.selectProduct(selected)),
    onFilterCategory: (cat) => dispatch(actions.initFilter(cat)),
    onSortPrice: (val) => dispatch(actions.initSortPrice(val)),
    onSortStock: (val) => dispatch(actions.initSortStock(val)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);