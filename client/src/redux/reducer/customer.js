import {
  GET_ALL_CUSTOMER_FAILED,
  GET_ALL_CUSTOMER_STRAT,
  GET_ALL_CUSTOMER_SUCCESS,
} from "../action/action.type";

const initalState = {
  viewCustomer: {
    loading: false,
    error: false,
    rowPerPage: 10,
    page: 0,
    customer: [],
    totalCount: "",
  },
};

const customer = (state = initalState, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMER_STRAT:
      return {
        ...state,
        viewCustomer: {
          ...state.viewCustomer,
          loading: true,
          error: false,
          customer: [],
        },
      };

    case GET_ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        viewCustomer: {
          loading: false,
          error: false,
          rowPerPage: action.payload.rowPerPage,
          page: action.payload.page,
          customer: action.payload.customer,
          totalCount: action.payload.totalCount,
        },
      };

    case GET_ALL_CUSTOMER_FAILED:
      return {
        ...state,
        viewCustomer: {
          ...state.viewCustomer,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default customer;
