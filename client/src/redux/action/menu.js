import {
  CATEGORY_STATE,
  CUSTOMER_STATE,
  PRODUCT_STATE,
  REPORT_STATE,
  SALESMAN_STATE,
  SUPPLIER_STATE,
  LOCATION_STATE,
} from "./action.type";

export const spplierState = () => ({
  type: SUPPLIER_STATE,
});

export const salesmanState = () => ({
  type: SALESMAN_STATE,
});

export const categoryState = () => ({
  type: CATEGORY_STATE,
});
export const customerState = () => ({
  type: CUSTOMER_STATE,
});
export const reportState = () => ({
  type: REPORT_STATE,
});
export const productState = () => ({
  type: PRODUCT_STATE,
});
export const locationState = () => ({
  type: LOCATION_STATE,
});
