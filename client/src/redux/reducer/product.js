const {
  GET_ALL_PRODUCT_STRAT,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILED,
} = require("../action/action.type");

const initalState = {
  allProduct: {
    loading: false,
    error: false,
    product: [],
    totalCount: "",
    rowPerPage: 10,
    page: 0,
  },
};

const product = (state = initalState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_STRAT:
      return {
        ...state,
        allProduct: {
          ...state.allProduct,
          loading: true,
          error: false,
          product: [],
          totalCount: "",
        },
      };
    case GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        allProduct: {
          loading: false,
          error: false,
          product: action.payload.product,
          totalCount: action.payload.totalCount,
          rowPerPage: action.payload.rowPerPage,
          page: action.payload.page,
        },
      };
    case GET_ALL_PRODUCT_FAILED:
      return {
        ...state,
        allProduct: {
          ...state.allProduct,
          loading: false,
          error: action.payload,
          product: [],
          totalCount: "",
        },
      };

    default:
      return state;
  }
};

export default product;
