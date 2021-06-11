import axios from "axios";
import { isAuthenticated } from "../../apicall";
import { API } from "../../backend";
import {
  ADD_NEW_SALESMAN_FAILED,
  ADD_NEW_SALESMAN_START,
  ADD_NEW_SALESMAN_SUCCESS,
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
