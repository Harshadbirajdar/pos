import {
  ADD_NEW_CATEGORY_FAILED,
  ADD_NEW_CATEGORY_START,
  ADD_NEW_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_FAILED,
  GET_ALL_CATEGORY_START,
  GET_ALL_CATEGORY_SUCCESS,
  GET_CATEGORY_BARCODE_FAILED,
  GET_CATEGORY_BARCODE_STRAT,
  GET_CATEGORY_BARCODE_SUCCESS,
} from "./action.type";
import axios from "axios";
import { isAuthenticated } from "../../apicall";
import { API } from "../../backend";

const addNewCategoryStart = () => ({
  type: ADD_NEW_CATEGORY_START,
});

const addNewCategorySuccess = (category) => ({
  type: ADD_NEW_CATEGORY_SUCCESS,
  payload: category,
});

const addNewCategoryFailed = (error) => ({
  type: ADD_NEW_CATEGORY_FAILED,
  payload: error,
});

export const addCategory = (values, setValues, setOpen) => {
  const { user, token } = isAuthenticated();

  return (dispatch) => {
    dispatch(addNewCategoryStart());
    axios
      .post(`${API}/${user._id}/category`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(addNewCategorySuccess(response.data));
        setOpen(true);
        setValues({ name: "", commision: "", commisionBase: 0, hsn: "" });
      })
      .catch((err) => {
        setOpen(true);

        dispatch(addNewCategoryFailed(err.response.data.error));
      });
  };
};

const getAllCategoryStart = () => ({
  type: GET_ALL_CATEGORY_START,
});

const getAllCategorySuccess = (category) => ({
  type: GET_ALL_CATEGORY_SUCCESS,
  payload: category,
});

const getAllCategoryFailed = (error) => ({
  type: GET_ALL_CATEGORY_FAILED,
  payload: error,
});

export const getAllCategory = (rowPerPage, page) => {
  const { user, token } = isAuthenticated();

  return (dispatch) => {
    dispatch(getAllCategoryStart());
    axios
      .get(`${API}/${user._id}/category?limit=${rowPerPage}&page=${page}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { category, totalCount } = response.data;
        dispatch(
          getAllCategorySuccess({
            categories: category,
            totalCount,
            rowPerPage,
            page,
          })
        );
      })
      .catch((err) => {
        dispatch(getAllCategoryFailed(err.response.data.error));
      });
  };
};

const getCategoryBarcodeStart = () => ({
  type: GET_CATEGORY_BARCODE_STRAT,
});

const getCategoryBarcodeSuccess = (category) => ({
  type: GET_CATEGORY_BARCODE_SUCCESS,
  payload: category,
});

const getCategoryBarcodeFailed = (error) => ({
  type: GET_CATEGORY_BARCODE_FAILED,
  payload: error,
});

export const getCategoryBarcode = (values, setVales, setOpen) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getCategoryBarcodeStart());

    axios
      .post(`${API}/${user._id}/category/barcode`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(getCategoryBarcodeSuccess(response.data));
        setVales({
          name: "",
          commision: "",
          commisionBase: 0,
          hsn: "",
          gstAmount: "",
          gstGreater: "",
          gstLesser: "",
          barcode: "",
        });
        setOpen(true);
      })
      .catch((err) => {
        dispatch(getCategoryBarcodeFailed(err.response.data.error));
        setOpen(true);
      });
  };
};
