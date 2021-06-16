import {
  GET_ALL_CUSTOMER_FAILED,
  GET_ALL_CUSTOMER_STRAT,
  GET_ALL_CUSTOMER_SUCCESS,
} from "./action.type";
import axios from "axios";
import { API } from "../../backend";
import { isAuthenticated } from "../../apicall";
const getAllCustomerStart = () => ({
  type: GET_ALL_CUSTOMER_STRAT,
});

const getAllCustomerSuccess = (customer) => ({
  type: GET_ALL_CUSTOMER_SUCCESS,
  payload: customer,
});

const getAllCustomerFailed = (error) => ({
  type: GET_ALL_CUSTOMER_FAILED,
  payload: error,
});

export const getAllCustomer = (rowPerPage, page) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getAllCustomerStart());
    axios
      .get(
        `${API}/${user._id}/all/customer?rowPerPage=${rowPerPage}&page=${page}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const { customer, totalCount } = response.data;
        dispatch(
          getAllCustomerSuccess({ customer, totalCount, rowPerPage, page })
        );
      })
      .catch((err) => {
        dispatch(getAllCustomerFailed(err.response.data.error));
      });
  };
};
