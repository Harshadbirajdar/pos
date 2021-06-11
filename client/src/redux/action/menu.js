import { CATEGORY_STATE, SALESMAN_STATE, SUPPLIER_STATE } from "./action.type";

export const spplierState = () => ({
  type: SUPPLIER_STATE,
});

export const salesmanState = () => ({
  type: SALESMAN_STATE,
});

export const categoryState = () => ({
  type: CATEGORY_STATE,
});
