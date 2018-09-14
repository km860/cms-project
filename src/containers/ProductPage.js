import React, { Component } from 'react';
import { css } from 'react-emotion';



const imagecontainer = css`
  width: 400px;
  height: 500px;
  img {
    width: 100%
  }
`
class ProductPage extends Component {
  state = {
    product: null
  }
  componentDidMount() {
    if (this.props.productInfo !== undefined) {
      console.log(this.props.productInfo.name);
      this.setState({product: this.props.productInfo})
    }
   
  }
  render() {
    /* this.props.productInfo.images.map(el => {
      images.push({original: 'http://localhost:1337' + el.url})
    }) */
    let gallery = null;
    if (this.props.productInfo !== undefined) {
      console.log(this.props.productInfo.images);
      const images = [];
      let info = this.props.productInfo;
      info.images.map(el => {
        console.log(el.url);
        images.push('http://localhost:1337'  + el.url)
      })
      console.log(images);
    }
    return (
      <div >
        <div className={imagecontainer}>
        </div>
      </div>
    )
  }
}

export default ProductPage;