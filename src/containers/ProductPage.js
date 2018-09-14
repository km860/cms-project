import React, { Component } from 'react';
import { css } from 'react-emotion';
import ImageGallery from 'react-image-gallery';

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
        images.push({
          original: 'http://localhost:1337'  + el.url,
          thumbnail: 'http://localhost:1337'  + el.url
        })
      })
      console.log(images);
      gallery = <ImageGallery 
                  items={images} 
                  showNav={false}
                  disableThumbnailScroll
                  disableSwipe 
                  showFullscreenButton={false}
                  showPlayButton={false}/>;
    }
    return (
      <div >
        <div className={imagecontainer}>
          {gallery}
        </div>
      </div>
    )
  }
}

export default ProductPage;