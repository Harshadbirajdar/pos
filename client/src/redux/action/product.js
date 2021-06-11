import axios from "axios";
import { isAuthenticated } from "../../apicall";
import { API } from "../../backend";

const {
  GET_ALL_PRODUCT_STRAT,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILED,
} = require("./action.type");

const getAllproductStart = () => ({
  type: GET_ALL_PRODUCT_STRAT,
});
const getAllProductSuccess = (product) => ({
  type: GET_ALL_PRODUCT_SUCCESS,
  payload: product,
});

const getAllProductFailed = (error) => ({
  type: GET_ALL_PRODUCT_FAILED,
  payload: error,
});

export const getAllProduct = (rowPerPage = 10, page) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getAllproductStart());
    axios
      .get(
        `${API}/${user._id}/all/product?rowPerPage=${rowPerPage}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const { product, totalCount } = response.data;
        dispatch(
          getAllProductSuccess({ product, totalCount, rowPerPage, page })
        );
      })
      .catch((err) => {
        dispatch(getAllProductFailed(err.response.data.error));
      });
  };
};
