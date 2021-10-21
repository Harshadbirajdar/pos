import {
  ADD_NEW_LOCATION_FAILED,
  ADD_NEW_LOCATION_START,
  ADD_NEW_LOCATION_SUCCESS,
} from "../action/action.type";

const initalState = {
  add: {
    loading: false,
    error: false,
    location: {},
    success: false,
  },
};
const location = (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_LOCATION_START:
      return {
        ...state,
        add: { loading: true, error: false, location: {}, success: false },
      };

    case ADD_NEW_LOCATION_SUCCESS:
      return {
        ...state,
        add: {
          loading: false,
          error: false,
          location: action.payload,
          success: true,
        },
      };

    case ADD_NEW_LOCATION_FAILED:
      return {
        ...state,
        add: {
          loading: false,
          error: action.payload,
          location: {},
          success: false,
        },
      };
    default:
      return state;
  }
};

export default location;
