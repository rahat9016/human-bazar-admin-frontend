import { pageConstance } from "../action/constance";

const initState = {
  error: null,
  loading: false,
  page: {},
};
export default (state = initState, action) => {
  switch (action.type) {
    case pageConstance.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case pageConstance.CREATE_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case pageConstance.CREATE_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
      return state;
  }
  return state;
};
