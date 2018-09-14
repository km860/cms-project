const initialState = {
  products: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_PRODUCTS':
      return ({...state, products: action.products});
    default:
      return state;

  }
}
export default reducer;