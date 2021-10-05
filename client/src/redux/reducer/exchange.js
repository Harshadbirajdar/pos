import {
  EXCHANGE_BILL_FAILED,
  EXCHANGE_BILL_START,
  EXCHANGE_BILL_SUCCESS,
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
  exchangeBill: {
    loading: false,
    error: false,
    bill: {
      product: [],
    },
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

    case EXCHANGE_BILL_START:
      return {
        ...state,
        exchangeBill: { loading: true, error: false, bill: { product: [] } },
      };

    case EXCHANGE_BILL_SUCCESS:
      return {
        ...state,
        exchangeBill: { loading: false, error: false, bill: action.payload },
      };

    case EXCHANGE_BILL_FAILED:
      return {
        ...state,
        exchangeBill: { loading: false, error: action.payload, bill: {} },
      };
    default:
      return state;
  }
};

export default exchange;
