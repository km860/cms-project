import axios from 'axios';

export const setProducts = (products) => {
  return {
    type: 'SET_PRODUCTS',
    products: products
  }
}

export const selectProduct = (selectedProduct) => {
  return {
    type: 'SELECT_ITEM',
    selected: selectedProduct
  }
}

export const initFilter = (cat) => {
  return dispatch => {
    axios.get('http://localhost:1337/products?category=' + cat)
      .then(res => {
        dispatch(setProducts(res.data))
      }) 
      .catch(err => {
        console.error(err);
      });
  }
}

export const initSortPrice = (val) => {
}

export const initProduct = (product) => {
  return dispatch => {
    axios.get('http://localhost:1337/products/' + product)
      .then(res => {
        dispatch(selectProduct(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const initShop = () => {
  return dispatch => {
    axios.get('http://localhost:1337/products')
      .then(res => {
        dispatch(setProducts(res.data));
      })
      .catch(err => {
        console.error(err);
      });
    //axios.get('http://localhost:1337/api/user/models')
  }  
}