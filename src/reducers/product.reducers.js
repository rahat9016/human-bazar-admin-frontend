import { productConstance } from "../action/constance";

const initState = {
  products: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstance.GET_ALL_PRODUCT_SUCCESS: {
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    }
    default:
      return state;
  }
  return state;
};
