import {
  ADD_NEW_CATEGORY_FAILED,
  ADD_NEW_CATEGORY_START,
  ADD_NEW_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_FAILED,
  GET_ALL_CATEGORY_START,
  GET_ALL_CATEGORY_SUCCESS,
  GET_CATEGORY_BARCODE_FAILED,
  GET_CATEGORY_BARCODE_STRAT,
  GET_CATEGORY_BARCODE_SUCCESS,
} from "../action/action.type";

const initalState = {
  loading: true,
  category: {},
  categories: [],
  error: false,
  success: false,
  all_loading: false,
  all_error: false,
  rowPerPage: 10,
  page: 0,
  totalCount: 0,
  barcode: {
    loading: false,
    error: false,
    success: false,
    category: {},
  },
};

const category = (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_CATEGORY_START:
      return {
        ...state,
        loading: true,
        error: false,
        category: {},
        success: false,
      };

    case ADD_NEW_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
        error: false,
        success: true,
      };

    case ADD_NEW_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case GET_ALL_CATEGORY_START:
      return {
        ...state,
        all_loading: true,
        all_error: false,
        categories: [],
      };

    case GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        all_loading: false,
        all_error: false,
        categories: action.payload.categories,
        totalCount: action.payload.totalCount,
        rowPerPage: action.payload.rowPerPage,
        page: action.payload.page,
      };

    case GET_ALL_CATEGORY_FAILED:
      return {
        ...state,
        all_loading: false,
        all_error: action.payload,
      };

    case GET_CATEGORY_BARCODE_STRAT:
      return {
        ...state,
        barcode: { loading: true, error: false, success: false, category: {} },
      };

    case GET_CATEGORY_BARCODE_SUCCESS:
      return {
        ...state,
        barcode: {
          loading: false,
          error: false,
          success: true,
          category: action.payload,
        },
      };

    case GET_CATEGORY_BARCODE_FAILED:
      return {
        ...state,
        barcode: {
          loading: false,
          error: action.payload,
          success: false,
          category: {},
        },
      };

    default:
      return state;
  }
};

export default category;
