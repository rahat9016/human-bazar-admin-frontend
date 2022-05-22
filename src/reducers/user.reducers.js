import { userConstants } from "../action/constance";

const initialState = {
  error: null,
  message: "",
  loading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case userConstants.USER_REGISTER_SUCCESS: {
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    }
    case userConstants.USER_REGISTER_FAILURE: {
      state = {
        ...initialState,
        error: action.payload.error,
        loading: false,
      };
      break;
    }
    default:
      return state;
  }
  return state;
};
