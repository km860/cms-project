import React, { Component } from 'react';
import styled, { css } from 'react-emotion';

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

const textContainer = css`
  max-width: 450px;
  h4 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.2em;
  }
  p {
    line-height: 1.6em;
    font-weight: 300;
    letter-spacing: 0.1em;
    color: #333; 
  }
  p:last-of-type {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 400;
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
class ProductPage extends Component {
  state = {
    product: null
  }
  componentDidMount() {
    if (this.props.productInfo && this.props.productInfo !== undefined) {
      console.log(this.props.productInfo.name);
      this.setState({product: this.props.productInfo})
    }
   
  }
  render() {
    /* this.props.productInfo.images.map(el => {
      images.push({original: 'http://localhost:1337' + el.url})
    }) */
    let gallery = null;
    let text = null;
    if (this.props.productInfo && this.props.productInfo !== undefined) {
      const info = this.props.productInfo
      console.log(this.props.productInfo.images);
      gallery = (
        <div>
          <img src={'http://localhost:1337' + info.images[0].url} alt=""/>
        </div>
      )
      text = (
        <div>
          <h4>{info.name}</h4>
          <p>{info.description}</p>
          <p>${info.price}</p>
          <BuyBtn>ADD TO CART</BuyBtn>
        </div>
      )
      
    }
    return (
      <div className={page}>
        <div className={imagecontainer}>
          {gallery}
        </div>
        <div className={textContainer}>
          {text}
        </div>
      </div>
    )
  }
}

export default ProductPage;