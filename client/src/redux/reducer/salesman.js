import {
  ADD_NEW_SALESMAN_START,
  ADD_NEW_SALESMAN_SUCCESS,
  ADD_NEW_SALESMAN_FAILED,
  GET_ALL_SALESMAN_STRAT,
  GET_ALL_SALESMAN_SUCCESS,
  GET_ALL_SALESMAN_FAILED,
} from "../action/action.type";

const initalState = {
  addSalesman: {
    loading: false,
    error: false,
    salesman: {},
    success: false,
  },
  viewSalesman: {
    loading: false,
    error: false,
    salseman: [],
    totalCount: "",
    rowPerPage: 10,
    page: 0,
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

    case GET_ALL_SALESMAN_STRAT:
      return {
        ...state,
        viewSalesman: {
          ...state.viewSalesman,
          loading: true,
          error: false,
          salseman: [],
        },
      };

    case GET_ALL_SALESMAN_SUCCESS:
      return {
        ...state,
        viewSalesman: {
          loading: false,
          error: false,
          salseman: action.payload.salesman,
          rowPerPage: action.payload.rowPerPage,
          page: action.payload.page,
          totalCount: action.payload.totalCount,
        },
      };

    case GET_ALL_SALESMAN_FAILED:
      return {
        ...state,
        viewSalesman: {
          ...state.viewSalesman,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default salseman;
