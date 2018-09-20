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
const orderDiv = css`
  width: 90%;
  margin: 20px auto;
  h3 {
    font-size: 22px;
    font-weight: 300;
  }
`
const formElement = css`
label {
  display: block;
  padding: 10px 2px;
}

input {
  width: 50%;
  height: 30px;
  border: 2px solid #e7e7e7;
  border-radius: 4px;
}
`
const submitBtn = css`
  display: block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #222222;
  color: white;
  letter-spacing: 0.2em;
  font-size: 18px;
  font-weight: lighter;
  border: none;
  outline: none;
  border-radius: 4px;
  &:hover {
    background-color: #222c;
  }
  &:active {
    background-color: black;
    box-shadow: none;
  }
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

    let cartObj = this.props.cartItems;

    let products = this.props.products;
    let pArr = products.filter(el => {
      return Object.keys(cartObj).includes(el.id);
    });

    pArr.map(el => {
      return (el.qt = cartObj[el.id]);
    })

    const finalPrice = pArr.map(el => {
      return cartObj[el.id] * el.price;
    }).reduce((a, b) => a + b, 0).toFixed(2)

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
          <div className={orderDiv}>
            <h3>Customer Information</h3>
            <form onSubmit={this.handleSubmit}>
              <div className={formElement}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  name='name' 
                  value={this.state.name} 
                  required
                  onChange={(event) => this.handleNameField(event, finalPrice)} />
              </div>
              <div className={formElement}>
                <label htmlFor="address">Address</label>
                <input 
                  type="text" 
                  name='address' 
                  value={this.state.address}
                  required 
                  onChange={this.handleAddressField} />
              </div>
              <div className={formElement}>
                <label htmlFor="zip">Zip Code</label>
                <input 
                  type="text" 
                  name='zip' 
                  value={this.state.zip}
                  required 
                  onChange={this.handleZipField} />
              </div>
              <div className={formElement}>
                <label htmlFor="city">City</label>
                <input 
                  type="text" 
                  name='city' 
                  value={this.state.city}
                  required 
                  onChange={this.handleCityField} />
              </div>
              <input type="submit" value='buy' className={submitBtn} />
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
