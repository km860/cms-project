// Jag suger på namngivning
const initialState = {
  products: [],
  selectedItem: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_PRODUCTS':
      return ({...state, products: action.products});
    case 'SELECT_ITEM':
      return ({...state, selectedItem: action.selected});
    /* case 'FILTER_CATEGORY':
      const filteredProducts = state.products.filter(el => {
        return el.category === action.category
      });
      return ({...state, products: filteredProducts}); */
    default:
      return state;
  }
}
export default reducer;