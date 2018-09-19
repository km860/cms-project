import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions'

class Checkout extends Component {
  componentWillMount() {
    this.props.onInitShop();
  }
  render() {
    let checkoutCart = [];
    let cartObj = this.props.cartItems;
    let cartArr = Object.keys(cartObj).map(function(key) {
      return {[key]: cartObj[key]};
    });
    console.log('cartitems ', cartArr);
    let products = this.props.products;
    return (
      <div>Hej</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    cartItems: state.cart
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitShop: () => dispatch(actions.initShop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
