const {
  GET_BILL_REPORT_STRAT,
  GET_BILL_REPORT_SUCCESS,
  GET_BILL_REPORT_FAILED,
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
    default:
      return state;
  }
};

export default report;
