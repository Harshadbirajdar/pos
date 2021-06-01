import {
  ADD_NEW_SUPPLIER_FAILED,
  ADD_NEW_SUPPLIER_START,
  ADD_NEW_SUPPLIER_SUCCESS,
  GET_ALL_SUPLIER_FAILED,
  GET_ALL_SUPLIER_START,
  GET_ALL_SUPLIER_SUCCESS,
} from "../action/action.type";

const initalState = {
  loading: false,
  success: false,
  error: false,
  supplier: {},
  suppliers: [],
  all_loading: false,
  all_error: false,
  rowPerPage: 10,
  page: 0,
  totalCount: 0,
};

const supplier = (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_SUPPLIER_START:
      return { ...state, loading: true, error: false, success: false };

    case ADD_NEW_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        supplier: action.payload,
      };
    case ADD_NEW_SUPPLIER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case GET_ALL_SUPLIER_START:
      return {
        ...state,
        all_loading: true,
        all_error: false,
        suppliers: [],
      };

    case GET_ALL_SUPLIER_SUCCESS:
      return {
        ...state,
        all_loading: false,
        all_error: false,
        suppliers: action.payload.supplier,
        totalCount: action.payload.totalCount,
        rowPerPage: action.payload.rowPerPage,
        page: action.payload.page,
      };

    case GET_ALL_SUPLIER_FAILED:
      return {
        ...state,
        all_loading: false,
        all_error: action.payload,
      };
    default:
      return state;
  }
};

export default supplier;
