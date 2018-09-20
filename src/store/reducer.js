const initialState = {
  products: [],
  selectedItem: null,
  reviews: [],
  cart: {},
  noOfItemsInCart: 0,
  done: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_PRODUCTS':
      return ({...state, products: action.products, done: false});

    case 'SELECT_ITEM':
      return ({...state, selectedItem: action.selected});

    case 'SET_REVIEWS':
      return ({...state, reviews: action.reviews});

    case 'ADD_TO_CART':
      const { productId } = action
      let updatedCart = state.cart;
      
      if (updatedCart[productId]) {
        updatedCart[productId] += 1;

      } else {
        updatedCart[productId] = 1;
      }
      console.log(updatedCart);
      
      return ({ ...state, cart: updatedCart, noOfItemsInCart: state.noOfItemsInCart + 1})
    case 'FILTER_CATEGORY':
      const filteredProducts = state.products.filter(el => {
        return el.category === action.category
      });
      return ({...state, products: filteredProducts});
    case 'ORDER_SUCCESS':
      return ({...state, done: true, noOfItemsInCart: 0, cart: {}});
    default:
      return state;
  }
}
export default reducer;