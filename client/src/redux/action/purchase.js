import axios from "axios";
import { isAuthenticated } from "../../apicall";
import { API } from "../../backend";
import {
  PURCHASE_ENTRY_FAILED,
  PURCHASE_ENTRY_START,
  PURCHASE_ENTRY_SUCCESS,
} from "./action.type";

const purchaseEntryStart = () => ({
  type: PURCHASE_ENTRY_START,
});

const purchaseEntrySuccess = (values) => ({
  type: PURCHASE_ENTRY_SUCCESS,
  payload: values,
});

const purchaseEntryFailed = (error) => ({
  type: PURCHASE_ENTRY_FAILED,
  payload: error,
});

export const purchaseEntry = (values, setValues) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(purchaseEntryStart());
    axios
      .post(`${API}/${user._id}/product`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(purchaseEntrySuccess(response.data));
        setValues({
          supplier: "",
          billNo: "",
          billDate: "",
          billAmount: "",
          sgst: "",
          cgst: "",
          igst: "",
          transportName: "",
          transportPrice: "",
          lrNo: "",
          transportDate: "",
          totalQty: "",
          withoutGst: "",
          product: [],
        });
      })
      .catch((err) => {
        console.log(err);
        // dispatch(purchaseEntryFailed(err.response.data.error));
      });
  };
};
