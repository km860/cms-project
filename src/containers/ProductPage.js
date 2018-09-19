import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';

import NavBar from '../components/NavBar/NavBar';
import Reviews from './Reviews';
import * as actions from '../store/actions';

const page = css`
  width: 95%;
  margin: 20px auto;
  display: flex;
`
const imagecontainer = css`
  max-width: 500px;
  margin-right: 70px;
  img {
    width: 100%
  }
`
const desc = css`
  line-height: 1.6em;
`

const prices = css`
  margin-top: 10px;
  font-size: 20px;
`
const textContainer = css`
  max-width: 450px;
  h4 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.2em;
  }
  
`

const BuyBtn  = styled('button')`
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #222222;
  color: white;
  letter-spacing: 0.2em;
  font-size: 15px;
  font-weight: lighter;
  border: none;
  outline: none;
  border-radius: 4px;
  box-shadow: 0px 0px 1px 1px grey;
  &:hover {
    background-color: #222c;
  }
  &:active {
    background-color: black;
    box-shadow: none;
  }
`
const stockSpan = css`
  font-size: 12px;
  color: grey;
`
class ProductPage extends Component {
  state = {
    product: null
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("id is", id)
    this.props.onInitProduct(id)
    /* if (this.props.productInfo && this.props.productInfo !== undefined) {
      console.log(this.props.productInfo.name);
      this.setState({product: this.props.productInfo})
    } */

   
  }

  componentDidUpdate(prevProps) {

  }

  handleClick = (event, id) => {
    event.preventDefault();
    console.log(id);
    this.props.onAddToCart(id);
  }
  render() {
    /* this.props.productInfo.images.map(el => {
      images.push({original: 'http://localhost:1337' + el.url})
    }) */
    let gallery = null;
    let text = null;
    if (this.props.productInfo && this.props.productInfo !== undefined) {
      const info = this.props.productInfo
      
      gallery = (
        <div>
          <img src={'http://localhost:1337' + info.images[0].url} alt=""/>
        </div>
      )
      text = (
        <div>
          <h4>{info.name}</h4>
          <p className={desc}>{info.description}</p>
          <div>
            <p className={prices}>${info.price}</p>
            <span className={stockSpan}>{info.in_stock} in stock</span>
          </div>
          <BuyBtn onClick={(event) => this.handleClick(event, info.id)}>ADD TO CART</BuyBtn>
        </div>
      )
      
    }
    return (
      <div>
        <NavBar inCart={this.props.itemsInCart} />
        <div className={page}>
          <div className={imagecontainer}>
            {gallery}
          </div>
          <div className={textContainer}>
            {text}
          </div>
        </div>
        <Reviews id={this.props.match.params.id} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    productInfo: state.selectedItem,
    itemsInCart: state.noOfItemsInCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitProduct: (id) => dispatch(actions.initProduct(id)),
    onAddToCart: (id) => dispatch(actions.addToCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);