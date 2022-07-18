import { authConstants } from "../action/constance";

const initialState = {
  token: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      state = {
        ...state,
        authenticating: true,
      };
      break;
    }
    case authConstants.LOGIN_SUCCESS: {
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    }
    case authConstants.LOGOUT_REQUEST: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case authConstants.LOGOUT_SUCCESS: {
      state = {
        ...initialState,
        loading: false,
      };
      break;
    }
    case authConstants.LOGOUT_FAILURE: {
      state = {
        ...state,
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
