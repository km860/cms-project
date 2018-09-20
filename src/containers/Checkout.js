import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import { css } from 'react-emotion';
import * as actions from '../store/actions'
import NavBar from '../components/NavBar/NavBar';

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
const formElement = css`

`

class Checkout extends Component {
  state = {
    name: '',
    address: '',
    zip: '',
    city: '',
    price_final: ''
  }
  componentWillMount() {
    this.props.onInitShop();
  }

  handleNameField = (event, finalPrice) => {
    event.preventDefault();
    this.setState({...this.state, name: event.target.value, price_final: finalPrice})
  }
  handleAddressField = (event) => {
    event.preventDefault();
    this.setState({...this.state, address: event.target.value})
  }
  handleZipField = (event) => {
    event.preventDefault();
    this.setState({...this.state, zip: event.target.value})
  }
  handleCityField = (event) => {
    event.preventDefault();
    this.setState({...this.state, city: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const orderData = {
      customer_info: {
        name: this.state.name,
        address: this.state.address,
        zip: this.state.zip,
        city: this.state.city
      },
      products: this.props.cartItems,
      price_final: this.state.price_final
    }
    this.props.onSubmitOrder(orderData);
    this.props.history.push('/');
  }


  render() {
    const doneRedirect = this.props.done ? <Redirect to='/' /> : null;
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

    const finalPrice = pArr.map(el => {
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
        Your cart is empty, <Link to='/'>go back?</Link>
        
      </div>
    );
    if (finalPrice > 1) {
      display = (
        <div>
          {doneRedirect}
          {summary}
          <div className={priceDiv}>
            <p><strong>Total Price</strong>: ${finalPrice}</p>
          </div>
          <div>
            <h3>Order</h3>
            <form onSubmit={this.handleSubmit}>
              <div className={formElement}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  name='name' 
                  value={this.state.name} 
                  onChange={(event) => this.handleNameField(event, finalPrice)} />
              </div>
              <div className={formElement}>
                <label htmlFor="address">Address</label>
                <input 
                  type="text" 
                  name='address' 
                  value={this.state.address} 
                  onChange={this.handleAddressField} />
              </div>
              <div className={formElement}>
                <label htmlFor="zip">Zip Code</label>
                <input 
                  type="text" 
                  name='zip' 
                  value={this.state.zip} 
                  onChange={this.handleZipField} />
              </div>
              <div className={formElement}>
                <label htmlFor="city">City</label>
                <input 
                  type="text" 
                  name='city' 
                  value={this.state.city} 
                  onChange={this.handleCityField} />
              </div>
              <input type="submit" value='submit' />
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        <NavBar inCart={this.props.itemsInCart}/>
        {display}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    cartItems: state.cart,
    itemsInCart: state.noOfItemsInCart,
    done: state.done
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onInitShop: () => dispatch(actions.initShop()),
      onSubmitOrder: (orderData) => dispatch(actions.postOrder(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
