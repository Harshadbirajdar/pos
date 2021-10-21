import axios from "axios";
import { API } from "../../backend";
import {
  ADD_NEW_LOCATION_FAILED,
  ADD_NEW_LOCATION_START,
  ADD_NEW_LOCATION_SUCCESS,
} from "./action.type";
import { isAuthenticated } from "../../apicall";

const addNewLocationStart = () => ({
  type: ADD_NEW_LOCATION_START,
});

const addNewLocationSuceess = (location) => ({
  type: ADD_NEW_LOCATION_SUCCESS,
  payload: location,
});

const addNewLocationFailed = (error) => ({
  type: ADD_NEW_LOCATION_FAILED,
  payload: error,
});

export const addNewLocation = (location, setLocation, setOpen) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(addNewLocationStart());
    axios
      .post(
        `${API}/${user._id}/location`,
        { name: location },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(addNewLocationSuceess(response.data));
        setLocation("");
        setOpen(true);
      })
      .catch((err) => {
        setOpen(true);
        dispatch(addNewLocationFailed(err.response.data.error));
      });
  };
};
