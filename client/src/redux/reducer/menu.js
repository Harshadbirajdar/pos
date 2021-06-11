import {
  CATEGORY_STATE,
  SALESMAN_STATE,
  SUPPLIER_STATE,
} from "../action/action.type";

const initalState = {
  supplier: false,

  salesman: false,

  category: false,
};

const menu = (state = initalState, action) => {
  switch (action.type) {
    case SUPPLIER_STATE:
      return { ...state, supplier: !state.supplier };

    case CATEGORY_STATE:
      return { ...state, category: !state.category };

    case SALESMAN_STATE:
      return { ...state, salesman: !state.salesman };
    default:
      return state;
  }
};

export default menu;
