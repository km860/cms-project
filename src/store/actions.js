import axios from 'axios';

export const setProducts = (products) => {
  return {
    type: 'SET_PRODUCTS',
    products: products
  }
}

export const initProducts = () => {
  return dispatch => {
    axios.get('http://localhost:1337/products')
      .then(res => {
        console.log(res.data)
        dispatch(setProducts(res.data));
        
      })
      .catch(err => {
        console.log(err);
      });
    //axios.get('http://localhost:1337/api/user/models')
  }  
}