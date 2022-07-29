import axios from "../helpers/axios";

export const addProduct = (form) => {
  return async (dispatch) => {
    console.log(form);
    const res = await axios.post("/product/create", form);
    console.log(res);
  };
};
