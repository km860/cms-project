import React, { Component } from 'react'
import { connect } from 'react-redux';
import { css } from 'react-emotion';
import { Route } from 'react-router-dom'

import SideBar from '../../components/SideBar/SideBar';
import Item from '../../components/Item/Item';
import ProductPage from '../ProductPage'
import * as actions from '../../store/actions';

const listItems = css`
  display: flex;
  flex-wrap: wrap;
`
class Shop extends Component {
  componentDidMount() {
    this.props.onInitProducts()
  }

  handleClick = (selected) => {
    this.props.onChooseItem(selected)
    this.props.history.push('/product')

  }

  render() {
    let productList = this.props.products.map((el, index) => {
      return <Item key={index} info={el} clicked={(selected) => this.handleClick(selected) } />
    });

    // filter the different categories
    const categories = this.props.products.filter((el, index, self) => {
      return index === self.findIndex((e) => {
        return e.category === el.category
      })
    }).map(el => el.category)
    console.log(categories);
    return (
      <div className="Main">
        <div>
          <SideBar categories={categories} />
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
    onInitProducts: () => dispatch(actions.initProducts()),
    onChooseItem: (selected) => dispatch(actions.selectProduct(selected))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);