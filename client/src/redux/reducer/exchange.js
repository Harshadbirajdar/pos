import {
  GET_BILL_BY_BARCODE_FAILED,
  GET_BILL_BY_BARCODE_STRAT,
  GET_BILL_BY_BARCODE_SUCCESS,
} from "../action/action.type";

const initalState = {
  bill: {
    loading: false,
    error: false,
    bill: {},
  },
};

const exchange = (state = initalState, action) => {
  switch (action.type) {
    case GET_BILL_BY_BARCODE_STRAT:
      return { ...state, bill: { loading: true, error: false, bill: {} } };

    case GET_BILL_BY_BARCODE_FAILED:
      return {
        ...state,
        bill: { loading: false, error: action.payload, bill: {} },
      };

    case GET_BILL_BY_BARCODE_SUCCESS:
      return {
        ...state,
        bill: { loading: false, bill: action.payload, error: false },
      };

    default:
      return state;
  }
};

export default exchange;
