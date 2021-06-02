import {
  PURCHASE_ENTRY_FAILED,
  PURCHASE_ENTRY_START,
  PURCHASE_ENTRY_SUCCESS,
} from "../action/action.type";

const initalState = {
  loading: "",
  product: [],
  error: "",
  success: false,
};

const purchase = (state = initalState, action) => {
  switch (action.type) {
    case PURCHASE_ENTRY_START:
      return { ...state, loading: true, error: false, success: false };
    case PURCHASE_ENTRY_SUCCESS:
      return { ...state, product: action.payload, success: true, error: false };
    case PURCHASE_ENTRY_FAILED:
      return { ...state, error: action.payload, success: false };
    default:
      return state;
  }
};

export default purchase;
