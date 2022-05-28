import { productConstance } from "../action/constance";

const initState = {
  products: [],
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case productConstance.GET_ALL_PRODUCT_SUCCESS: {
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    }
  }
  return state;
};
