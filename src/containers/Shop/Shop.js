import React, { Component } from 'react'
import { connect } from 'react-redux';
import { css } from 'react-emotion';
// import { Route } from 'react-router-dom'

import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar';
import Item from '../../components/Item/Item';
// import ProductPage from '../ProductPage'
import * as actions from '../../store/actions';

const listItems = css`
  display: flex;
  flex-wrap: wrap;
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

  render() {
    let productList = this.props.products.map((el, index) => {
      return <Item key={index} info={el} clicked={(selected) => this.handleClick(selected) } />
    });

    // filter the different categories
    /* const categories = this.props.products.filter((el, index, self) => {
      return index === self.findIndex((e) => {
        return e.category === el.category
      })
    }).map(el => el.category) */
    const categories = ['toy drones', 'camera drones', 'drone accessories'];
    return (
      <div className="Main">
        <NavBar />
        <div>
          <SideBar 
            categories={categories} 
            filterCat={(cat) => this.handleFilter(cat)}
            clickReset={this.props.onInitShop}
            sortPrice={(val) => this.handleSortPrice(val)} />
        </div>
        <div className={listItems}>
          {productList}
        </div>
        {/* <Route 
          path='/product'
          render={(props) => <ProductPage {...props} productInfo={this.props.chosenItem} />}
        /> */}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    chosenItem: state.selectedItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitShop: () => dispatch(actions.initShop()),
    onChooseItem: (selected) => dispatch(actions.selectProduct(selected)),
    onFilterCategory: (cat) => dispatch(actions.initFilter(cat)),
    onSortPrice: (val) => dispatch(actions.initSortPrice(val))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);