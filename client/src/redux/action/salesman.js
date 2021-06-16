import axios from "axios";
import { isAuthenticated } from "../../apicall";
import { API } from "../../backend";
import {
  ADD_NEW_SALESMAN_FAILED,
  ADD_NEW_SALESMAN_START,
  ADD_NEW_SALESMAN_SUCCESS,
  GET_ALL_SALESMAN_FAILED,
  GET_ALL_SALESMAN_STRAT,
  GET_ALL_SALESMAN_SUCCESS,
} from "./action.type";

const addNewSalesmanStart = () => ({
  type: ADD_NEW_SALESMAN_START,
});
const addNewSalesmanSucces = (salesman) => ({
  type: ADD_NEW_SALESMAN_SUCCESS,
  payload: salesman,
});

const addNewSalesmanFailed = (error) => ({
  type: ADD_NEW_SALESMAN_FAILED,
  payload: error,
});

export const addSalesman = (values, setValues, setOpen) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(addNewSalesmanStart());
    axios
      .post(`${API}/${user._id}/salesman`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(addNewSalesmanSucces(response.data));
        setValues({ name: "", phoneNumber: "", id: "" });
        setOpen(true);
      })
      .catch((err) => {
        dispatch(addNewSalesmanFailed(err.response.data.error));
        setOpen(true);
      });
  };
};

const getAllSalesmanStart = () => ({
  type: GET_ALL_SALESMAN_STRAT,
});

const getAllSalesmanSuccess = (salesman) => ({
  type: GET_ALL_SALESMAN_SUCCESS,
  payload: salesman,
});

const getAllSalesmanFailed = (error) => ({
  type: GET_ALL_SALESMAN_FAILED,
  payload: error,
});

export const getAllSalesman = (rowPerPage, page) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getAllSalesmanStart());
    axios
      .get(`${API}/${user._id}/all/salesman`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { salesman, totalCount } = response.data;
        dispatch(
          getAllSalesmanSuccess({ salesman, totalCount, rowPerPage, page })
        );
      })
      .catch((err) => {
        dispatch(getAllSalesmanFailed(err.response.data.error));
      });
  };
};
