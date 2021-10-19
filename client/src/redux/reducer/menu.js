import {
  CATEGORY_STATE,
  CUSTOMER_STATE,
  LOCATION_STATE,
  PRODUCT_STATE,
  REPORT_STATE,
  SALESMAN_STATE,
  SUPPLIER_STATE,
} from "../action/action.type";

const initalState = {
  supplier: false,
  salesman: false,
  category: false,
  customer: false,
  report: false,
  product: false,
  location: false,
};

const menu = (state = initalState, action) => {
  switch (action.type) {
    case SUPPLIER_STATE:
      return { ...state, supplier: !state.supplier };

    case CATEGORY_STATE:
      return { ...state, category: !state.category };

    case SALESMAN_STATE:
      return { ...state, salesman: !state.salesman };
    case CUSTOMER_STATE:
      return { ...state, customer: !state.customer };

    case REPORT_STATE:
      return { ...state, report: !state.report };
    case PRODUCT_STATE:
      return { ...state, product: !state.product };
    case LOCATION_STATE:
      return { ...state, location: !state.location };
    default:
      return state;
  }
};

export default menu;
