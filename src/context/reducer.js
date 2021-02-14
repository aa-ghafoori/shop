export const initialState = {
  products: [],
};

export const actionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      return { ...state, products: action.products };
    default:
      return state;
  }
};

export default reducer;
