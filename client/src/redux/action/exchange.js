import axios from "axios";
import { isAuthenticated } from "../../apicall";
import { API } from "../../backend";

import {
  GET_BILL_BY_BARCODE_FAILED,
  GET_BILL_BY_BARCODE_STRAT,
  GET_BILL_BY_BARCODE_SUCCESS,
} from "./action.type";

const getBillByBarcodeStart = () => ({
  type: GET_BILL_BY_BARCODE_STRAT,
});

const getBillByBarcodeSuccess = (bill) => ({
  type: GET_BILL_BY_BARCODE_SUCCESS,
  payload: bill,
});

const getBillByBarcodeFailed = (error) => ({
  type: GET_BILL_BY_BARCODE_FAILED,
  payload: error,
});

export const getBillByBarcode = (id, setId, setOpen, setBill) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getBillByBarcodeStart());
    axios
      .get(`${API}/${user._id}/bill/barcode?id=${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(getBillByBarcodeSuccess(response.data));
        // setId("");
        setBill(response.data);
        setOpen(true);
      })
      .catch((err) => {
        dispatch(getBillByBarcodeFailed(err.response.data.error));
      });
  };
};
