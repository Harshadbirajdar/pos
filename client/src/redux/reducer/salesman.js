import {
  ADD_NEW_SALESMAN_START,
  ADD_NEW_SALESMAN_SUCCESS,
  ADD_NEW_SALESMAN_FAILED,
} from "../action/action.type";

const initalState = {
  addSalesman: {
    loading: false,
    error: false,
    salesman: {},
    success: false,
  },
};

const salseman = (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_SALESMAN_START:
      return {
        ...state,
        addSalesman: {
          loading: true,
          error: false,
          salesman: {},
          success: false,
        },
      };

    case ADD_NEW_SALESMAN_FAILED:
      return {
        ...state,
        addSalesman: {
          loading: false,
          error: action.payload,
          salesman: {},
          success: false,
        },
      };

    case ADD_NEW_SALESMAN_SUCCESS:
      return {
        ...state,
        addSalesman: {
          loading: false,
          error: false,
          salesman: action.payload,
          success: true,
        },
      };
    default:
      return state;
  }
};

export default salseman;
