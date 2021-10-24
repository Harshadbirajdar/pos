import axios from "axios";

import { isAuthenticated } from "../../apicall";
import { API } from "../../backend";
import {
  GET_CUSTOMER_BY_NUMBER_FOR_SALE_SUCCESS,
  GET_PRODUCT_BY_BARCODE_FAILED,
  GET_PRODUCT_BY_BARCODE_START,
  GET_PRODUCT_BY_BARCODE_SUCCESS,
  GET_CUSTOMER_BY_NUMBER_FOR_SALE_FAILED,
  GET_CUSTOMER_BY_NUMBER_FOR_SALE_START,
  ADD_NEW_CUSTOMER_SUCCESS,
  ADD_NEW_CUSTOMER_FAILED,
  ADD_NEW_CUSTOMER_START,
  GENRATE_BILL_START,
  GENRATE_BILL_SUCCESS,
  GENRATE_BILL_FAILED,
  GET_CATEGORY_BARCODE_STRAT,
  GET_CATEGORY_BARCODE_SUCCESS,
  GET_CATEGORY_BARCODE_FAILED,
  GET_CATEGORY_BARCODE_NAME_START,
  GET_CATEGORY_BARCODE_NAME_SUCCESS,
  GET_CATEGORY_BARCODE_NAME_FAILED,
  GET_CATEGORY_BARCODE_CLEAR,
  GET_EXCHANGE_BILL_BY_ID_FOR_SALE_START,
  GET_EXCHANGE_BILL_BY_ID_FOR_SALE_SUCCESS,
  GET_EXCHANGE_BILL_BY_ID_FOR_SALE_FAILED,
  GET_EXCHANGE_BILL_BY_ID_FOR_SALE_CLEAR,
  GENRATE_BILL_CLEAR,
} from "./action.type";

const getProdcutByBarcodeStart = () => ({
  type: GET_PRODUCT_BY_BARCODE_START,
});
const getProdcutByBarcodeSuccess = (product) => ({
  type: GET_PRODUCT_BY_BARCODE_SUCCESS,
  payload: product,
});
const getProdcutByBarcodeFailed = (error) => ({
  type: GET_PRODUCT_BY_BARCODE_FAILED,
  payload: error,
});

export const getProductByBarcode = (
  barcode,
  values,
  setValues,
  Prodcut,
  setProduct,
  setOpen,
  salesmanRef
) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getProdcutByBarcodeStart());

    axios
      .get(`${API}/${user._id}/product?barcode=${barcode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { price, barcode, category, cgst, sgst, _id } = response.data;
        let calculate;
        Prodcut.qty = Prodcut.qty ? Prodcut.qty : 1;

        Prodcut.amount = price * Prodcut.qty;
        if (category.commisionBase === 0) {
          calculate = (Prodcut.amount * category.commision) / 100;
          calculate = Math.round(calculate / 0.5) * 0.5;
        } else {
          calculate = category.commision;
        }
        Prodcut.price = price;
        // Prodcut.barcode = barcode;
        Prodcut.name = category.name;
        Prodcut.commission = calculate;
        Prodcut.hsn = category.hsn;
        Prodcut.gst = cgst + sgst;
        Prodcut._id = _id;

        let localProduct = values.product;
        let product = [];

        localProduct.forEach((products) => {
          if (
            products.salesman === Prodcut.salesman &&
            products.barcode === Prodcut.barcode
          ) {
            Prodcut.qty += products.qty;
            Prodcut.amount += products.amount;
            Prodcut.commission += products.commission;
            product.push(Prodcut);
          } else {
            product.push(products);
          }
        });

        if (JSON.stringify(localProduct) === JSON.stringify(product)) {
          product.push(Prodcut);
        }

        setValues({ ...values, product });
        setProduct({ barcode: "", salesman: "", qty: "", price: "" });

        dispatch(getProdcutByBarcodeSuccess(response.data));
        salesmanRef.current.focus();
      })
      .catch((err) => {
        setOpen(true);
        // console.log(err.response.data);
        dispatch(getProdcutByBarcodeFailed(err.response.data.error));
      });
  };
};

const getCustomerByPhoneNumberStart = () => ({
  type: GET_CUSTOMER_BY_NUMBER_FOR_SALE_START,
});

const getCustomerByPhoneNumberSuccess = (customer) => ({
  type: GET_CUSTOMER_BY_NUMBER_FOR_SALE_SUCCESS,
  payload: customer,
});
const getCustomerByPhoneNumberFailed = (error) => ({
  type: GET_CUSTOMER_BY_NUMBER_FOR_SALE_FAILED,
  payload: error,
});

export const getCustomerByPhone = (values, setValues, salesmanRef, nameRef) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getCustomerByPhoneNumberStart());

    axios
      .get(
        `${API}/${user._id}/customer?${
          values?.customer?.phoneNumber && `phoneNumber`
        }=${values?.customer?.phoneNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setValues({ ...values, customer: response.data });
        dispatch(getCustomerByPhoneNumberSuccess(response.data));
        salesmanRef.current.focus();
      })
      .catch((err) => {
        if (err.response.data.error === "Customer Not Found in Database") {
          nameRef.current.focus();
        }
        setValues({ ...values, customer: { ...values.customer, name: "" } });
        dispatch(getCustomerByPhoneNumberFailed(err.response.data.error));
      });
  };
};

const addNewCustomerStart = () => ({
  type: ADD_NEW_CUSTOMER_START,
});

const addNewCustomerSuccess = (customer) => ({
  type: ADD_NEW_CUSTOMER_SUCCESS,
  payload: customer,
});

const addNewCustomerFailed = (error) => ({
  type: ADD_NEW_CUSTOMER_FAILED,
  payload: error,
});

export const AddNewCustomer = (values, setValues, salesmanRef) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(addNewCustomerStart());

    axios
      .post(
        `${API}/${user._id}/customer`,
        {
          name: values.customer.name,
          phoneNumber: values.customer.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(addNewCustomerSuccess(response.data));
        setValues({ ...values, customer: response.data });
        salesmanRef.current.focus();
      })
      .catch((err) => {
        dispatch(addNewCustomerFailed(err.response.data.error));
      });
  };
};

const genrateBillStart = () => ({
  type: GENRATE_BILL_START,
});

const genrateBillSuccess = (bill) => ({
  type: GENRATE_BILL_SUCCESS,
  payload: bill,
});

const genrateBillFailed = (error) => ({
  type: GENRATE_BILL_FAILED,
  payload: error,
});

export const genrateBill = (
  values,
  setValues,
  numberRef,
  handlePrint,
  setExchangeId
) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(genrateBillStart());
    axios
      .post(`${API}/${user._id}/bill`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExchangeId("");
        setValues({
          product: [],
          amount: 0,
        });
        dispatch(genrateBillSuccess(response.data));
        dispatch(getExchangeBillByIdclear());
        numberRef.current.focus();
        document.getElementById("printBill").click();
      })
      .catch((err) => {
        dispatch(genrateBillFailed(err.response.data.error));
      });
  };
};

const getCategoryBarcodeStart = () => ({
  type: GET_CATEGORY_BARCODE_STRAT,
});
const getCategoryBarcodeSuccess = (cateogry) => ({
  type: GET_CATEGORY_BARCODE_SUCCESS,
  payload: cateogry,
});

const getCategoryBarcodeFailed = (error) => ({
  type: GET_CATEGORY_BARCODE_FAILED,
  payload: error,
});

export const getCategoryBarcodeClear = () => ({
  type: GET_CATEGORY_BARCODE_CLEAR,
});

export const getCategoryBarcode = (
  barcode,
  qtyRef,
  prodcut,
  setProduct,
  setOpen
) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getCategoryBarcodeStart());

    axios
      .get(`${API}/${user._id}/category/barcode?barcode=${barcode}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(getCategoryBarcodeSuccess(response.data));
        setProduct({ ...prodcut, barcode: response.data.barcode });
        qtyRef.current.focus();
      })
      .catch((err) => {
        setOpen(true);
        dispatch(getCategoryBarcodeFailed(err.response.data.error));
      });
  };
};

const getCategoryBarcodeNameStart = () => ({
  type: GET_CATEGORY_BARCODE_NAME_START,
});

const getCategoryBarcodeNameSuccess = (category) => ({
  type: GET_CATEGORY_BARCODE_NAME_SUCCESS,
  payload: category,
});

const getCategoryBarcodeNameFailed = (error) => ({
  type: GET_CATEGORY_BARCODE_NAME_FAILED,
  payload: error,
});

export const getCategoryBarcodeName = () => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getCategoryBarcodeNameStart());

    axios
      .get(`${API}/${user._id}/category/barcode/name`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(getCategoryBarcodeNameSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getCategoryBarcodeNameFailed(err.response.data.error));
      });
  };
};

const getExchangeBillByIdStart = () => ({
  type: GET_EXCHANGE_BILL_BY_ID_FOR_SALE_START,
});
const getExchangeBillByIdSuccess = (bill) => ({
  type: GET_EXCHANGE_BILL_BY_ID_FOR_SALE_SUCCESS,
  payload: bill,
});
const getExchangeBillByIdFailed = (error) => ({
  type: GET_EXCHANGE_BILL_BY_ID_FOR_SALE_FAILED,
  payload: error,
});
const getExchangeBillByIdclear = () => ({
  type: GET_EXCHANGE_BILL_BY_ID_FOR_SALE_CLEAR,
});

export const getExchangeBillById = (
  id,
  setError,
  setOpen,
  exchangeRef,
  values,
  setValues
) => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getExchangeBillByIdStart());

    axios
      .get(`${API}/${user._id}/exchange?billNo=${id}&date=2021/10/07`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.isUsed) {
          setOpen(true);
          setError("Exchange Bill is already used...");
        } else {
          dispatch(getExchangeBillByIdSuccess(response.data));
          exchangeRef.current.focus();
          setValues({
            ...values,
            exchange: response.data,
            amount: -response.data.amount,
          });
        }
      })
      .catch((err) => {
        setOpen(true);
        setError(err.response.data.error);
        dispatch(getExchangeBillByIdFailed(err.response.data.error));
      });
  };
};

export const genrateBillClear = () => ({
  type: GENRATE_BILL_CLEAR,
});
