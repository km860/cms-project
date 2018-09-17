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
        console.error(err)
      })
  }
}

export const initSortPrice = (val) => {
  let sort = 'asc';
  if (val === 'High') {
    sort = 'desc'
  }
  return dispatch => {
    axios.get('http://localhost:1337/products?_sort=price:' + sort)
      .then(res => {
        dispatch(setProducts(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }
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
        console.error(err)
      })
    //axios.get('http://localhost:1337/api/user/models')
  }  
}

export const setReviews = (data) => {
  return {
    type: 'SET_REVIEWS',
    reviews: data
  }
}

export const getReviews = (id) => {
  return dispatch => {
    axios.get('http://localhost:1337/review?productId=' + id)
      .then(res => {
        console.log(res.data)
        dispatch(setReviews(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }
}