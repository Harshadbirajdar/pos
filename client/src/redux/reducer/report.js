const {
  GET_BILL_REPORT_STRAT,
  GET_BILL_REPORT_SUCCESS,
  GET_BILL_REPORT_FAILED,
  GET_SALESMAN_REPORT_STRAT,
  GET_SALESMAN_REPORT_SUCCESS,
  GET_SALESMAN_REPORT_FAILED,
} = require("../action/action.type");

const initalState = {
  bill: {
    loading: false,
    error: false,
    rowPerPage: 10,
    page: 0,
    totalCount: "",
    bill: [],
  },
  salesman: {
    loading: false,
    error: false,
    salesman: [],
  },
};

const report = (state = initalState, action) => {
  switch (action.type) {
    case GET_BILL_REPORT_STRAT:
      return { ...state, bill: { ...state.bill, loading: true, bill: [] } };

    case GET_BILL_REPORT_SUCCESS:
      return {
        ...state,
        bill: {
          loading: false,
          rowPerPage: action.payload.rowPerPage,
          page: action.payload.page,
          totalCount: action.payload.totalCount,
          bill: action.payload.bill,
          error: false,
        },
      };

    case GET_BILL_REPORT_FAILED:
      return {
        ...state,
        bill: {
          ...state.bill,
          error: action.payload,
          bill: [],
          loading: false,
        },
      };
    case GET_SALESMAN_REPORT_STRAT:
      return {
        ...state,
        salesman: {
          loading: true,

          error: false,
          salesman: [],
        },
      };
    case GET_SALESMAN_REPORT_SUCCESS:
      return {
        ...state,
        salesman: {
          loading: false,

          error: false,
          salesman: action.payload,
        },
      };
    case GET_SALESMAN_REPORT_FAILED:
      return {
        ...state,
        salesman: {
          loading: false,

          error: action.payload,
          salesman: [],
        },
      };
    default:
      return state;
  }
};

export default report;
