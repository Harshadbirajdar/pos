import {
  ADD_NEW_SUPPLIER_FAILED,
  ADD_NEW_SUPPLIER_START,
  ADD_NEW_SUPPLIER_SUCCESS,
  GET_ALL_SUPLIER_FAILED,
  GET_ALL_SUPLIER_START,
  GET_ALL_SUPLIER_SUCCESS,
} from "./action.type";
import axios from "axios";
import { API } from "../../backend";
import { isAuthenticated } from "../../apicall";

const addNewSupplierStart = () => ({
  type: ADD_NEW_SUPPLIER_START,
});
const addNewSupplierSuccess = (party) => ({
  type: ADD_NEW_SUPPLIER_SUCCESS,
  payload: party,
});

const addNewSupplierFailed = (error) => ({
  type: ADD_NEW_SUPPLIER_FAILED,
  payload: error,
});

export const addSupplier = (values, setValues, setOpen) => {
  const { user, token } = isAuthenticated();

  return (dispatch) => {
    dispatch(addNewSupplierStart());
    axios
      .post(`${API}/${user._id}/supplier`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setValues({
          name: "",
          contactNumber: "",
          state: "",
          address: "",
          shortName: "",
        });
        setOpen(true);
        dispatch(addNewSupplierSuccess(response.data));
      })
      .catch((err) => {
        setOpen(true);
        dispatch(addNewSupplierFailed(err.response.data.error));
      });
  };
};

const getAllSupplierStart = () => ({
  type: GET_ALL_SUPLIER_START,
});

const getAllSupplierSuccess = (supplier) => ({
  type: GET_ALL_SUPLIER_SUCCESS,
  payload: supplier,
});

const getAllSupplierFailed = (error) => ({
  type: GET_ALL_SUPLIER_FAILED,
  payload: error,
});

export const getAllSupplier = (rowPerPage, page) => {
  const { user, token } = isAuthenticated();

  return (dispatch) => {
    dispatch(getAllSupplierStart());
    axios
      .get(`${API}/${user._id}/supplier?limit=${rowPerPage}&page=${page}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { supplier, totalCount } = response.data;
        dispatch(
          getAllSupplierSuccess({ supplier, totalCount, rowPerPage, page })
        );
      })
      .catch((err) => {
        dispatch(getAllSupplierFailed(err.response.data.error));
      });
  };
};
