import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'react-emotion';
import * as actions from '../store/actions'

const itemDiv = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 20px auto;
  border-bottom: 1px solid grey;
  padding: 10px;
`

const imgDiv = css`
  width: 80px;
  img {
    width: 100%;
  }
`
const textDiv = css`
  max-width: 200px;
  flex-grow: 1;
`
const priceDiv = css`
  width: 90%;
  margin: 10px auto;
`

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
    console.log(Object.keys(cartObj))
    let pArr = products.filter(el => {
      return Object.keys(cartObj).includes(el.id);
    });
    pArr.map(el => {
      return (el.qt = cartObj[el.id]);
    })
    console.log('pArr', pArr);

    let finalPrice = pArr.map(el => {
      return cartObj[el.id] * el.price;
    }).reduce((a, b) => a + b, 0).toFixed(2)
    console.log('final price: ', finalPrice)
    let summary = pArr.map((el, index) => {
      return (
        <div key={index} className={itemDiv}>
          <div className={imgDiv}><img src={"http://localhost:1337" + el.images[0].url} alt=""/></div>
          <div className={textDiv}><p>{el.name}</p></div>
          <div className={textDiv}><p>Qt: {el.qt}</p></div>
          <div className={textDiv}><p>Price: ${(el.qt * el.price).toFixed(2)}</p></div>
        </div>
      );
    })
    let display = (
      <div>
        Your cart is empty
      </div>
    );
    if (finalPrice > 1) {
      display = (
        <div>
          {summary}
          <div className={priceDiv}>
            <p><strong>Total Price</strong>: ${finalPrice}</p>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        {display}
      </div>
    );
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
