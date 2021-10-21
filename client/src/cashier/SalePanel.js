import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import React, { useState, useRef, useEffect } from "react";
import Base from "../core/Base";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";

import {
  AddNewCustomer,
  genrateBill,
  getCategoryBarcode,
  getCustomerByPhone,
  getProductByBarcode,
  getCategoryBarcodeName,
  getCategoryBarcodeClear,
  getExchangeBillById,
  genrateBillClear,
} from "../redux/action/sale";
import BillPrint from "../components/BillPrint";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(3),
  },
}));
const SalePanel = ({
  getProductByBarcode,
  Barcode,
  getCustomer,
  addCustomer,
  genrateBill,
  Bill,
  getCategoryBarcode,
  CategoryBarcode,
  barcodeName,
  BarcodeName,
  clearBarcode,
  getExchangeBillById,
  Exchange,
  clearBill,
}) => {
  const componentRef = useRef();
  const [page, setPage] = useState(`@page { size:79mm 200px;margin:0}`);
  // const pageStyle = page;
  useEffect(() => {
    setPage(
      `@page { size:79mm ${560 + Bill?.bill?.product?.length * 41}px;margin:0}`
    );
  }, [Bill.bill.product.length]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: page,
    onAfterPrint: () => {
      clearBill();
    },
    onBeforeGetContent: (a) => {
      console.log(a);
    },
  });

  useEffect(() => {
    barcodeName();
  }, []);

  const classes = useStyles();
  const [values, setValues] = useState({
    product: [],
    // customer: {
    //   name: "",
    //   phoneNumber: "",
    // },
    amount: 0,
    location: JSON.parse(localStorage.getItem("location")),
  });
  const [error, setError] = useState(false);
  const [exchangeId, setExchangeId] = useState("");
  const [prodcut, setProduct] = useState({
    salesman: "",
    barcode: "",
    price: "",
    qty: "",
    barcodeName: "",
  });
  const inputRef = useRef();
  const salesmanRef = useRef();
  const formRef = useRef();
  const nameRef = useRef();
  const qtyRef = useRef();
  const priceRef = useRef();
  const numberRef = useRef();
  const exchangeRef = useRef();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const errorMsg = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {Barcode.error || error || CategoryBarcode.error}
        </Alert>
      </Snackbar>
    );
  };
  const onhandleChange = (name) => (event) => {
    setProduct({ ...prodcut, [name]: event.target.value });
  };
  const countTotalAmount = () => {
    setValues({
      ...values,
      amount: values.product.reduce((a, b) => a + b.amount, 0),
    });
  };

  const onPriceEnterKey = (e) => {
    let product = {};
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      product.salesman = prodcut.salesman;
      product.barcode = prodcut.barcode;
      product.barcode = prodcut.barcode;
      product.price = prodcut.price;
      product.qty = prodcut.qty;
      product.amount = parseFloat((product.qty * product.price).toFixed(2));
      product.name = CategoryBarcode.product.name;
      product.hsn = CategoryBarcode.product.hsn;
      product.isQtyOne = CategoryBarcode.product.isQtyOne;
      let calculate;
      if (CategoryBarcode.product.commisionBase === 0) {
        calculate = (product.amount * CategoryBarcode.product.commision) / 100;
        calculate = Math.round(calculate / 0.5) * 0.5;
      } else {
        calculate = CategoryBarcode.product.commision;
      }
      product.commission = calculate;

      if (CategoryBarcode.product.gstAmount < product.price) {
        product.gst = CategoryBarcode.product.gstGreater;
      } else {
        product.gst = CategoryBarcode.product.gstLesser;
      }

      let Product = values.product;
      Product.push(product);
      setValues({ ...values, product: Product });
      // salesmanRef.current.focus();
      countTotalAmount();
      setProduct({ salesman: "", barcode: "", price: "", qty: "" });
      clearBarcode();
    }
  };

  useEffect(() => {
    countTotalAmount();
  }, [values.product]);
  return (
    <Base title="Sale Panel" sale={true}>
      <div
        onKeyDown={(e) => {
          if (values.product.length !== 0 && e.code === "F2") {
            e.preventDefault();

            genrateBill(values, setValues, numberRef, handlePrint);
          }
        }}
      >
        <Container>
          {errorMsg()}
          <Paper className={classes.root}>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Phone Number"
                    type="Number"
                    inputRef={numberRef}
                    value={values.customer?.phoneNumber || ""}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        customer: {
                          ...values.customer,
                          phoneNumber: e.target.value,
                        },
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.code === "Tab") {
                        exchangeRef.current.focus();
                        return;
                      }
                      if (e.code === "Enter" || e.code === "NumpadEnter") {
                        if (
                          e.target.value === "" ||
                          e.target.value.length !== 10
                        ) {
                          setError("Please enter the Valid Phone Number");
                          setValues({ ...values, customer: {} });
                          setOpen(true);
                          return;
                        }
                        getCustomer(values, setValues, salesmanRef, nameRef);
                      }
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    inputRef={nameRef}
                    value={values.customer?.name || ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        customer: {
                          ...values.customer,
                          name: e.target.value,
                        },
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.code === "Enter" || e.code === "NumpadEnter") {
                        addCustomer(values, setValues, salesmanRef);
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    inputRef={exchangeRef}
                    value={exchangeId}
                    onChange={(e) => {
                      setExchangeId(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.code === "Enter" || e.code === "NumpadEnter") {
                        getExchangeBillById(exchangeId, setError, setOpen);
                      }
                    }}
                    label="Exchange Bill Number"
                  ></TextField>
                </Grid>
                <Grid style={{ marginLeft: "auto" }}>
                  <div
                    style={{
                      width: " 15em",
                      border: "2px solid",
                      textAlign: " center",
                      fontSize: "20px",
                    }}
                  >
                    <h1>{parseInt(values.amount)}</h1>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={2}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Salesman"
                    type="Number"
                    name="salesman"
                    inputRef={salesmanRef}
                    value={prodcut.salesman}
                    onKeyDown={(e) => {
                      if (e.code === "Enter" || e.code === "NumpadEnter") {
                        if (e.target.value !== "") {
                          inputRef.current.focus();
                        } else {
                          setError("Please Enter the salesman Number");
                          setOpen(true);
                        }
                      }
                      // console.log();
                    }}
                    onChange={onhandleChange("salesman")}
                  />
                </Grid>

                <Grid item md={2}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Barcode"
                    // type="Number"
                    value={prodcut.barcode}
                    inputRef={inputRef}
                    onChange={onhandleChange("barcode")}
                    onKeyDown={(e) => {
                      if (e.code === "NumpadEnter" || e.code === "Enter") {
                        if (Number(prodcut.barcode.split("/")[0]) > 150) {
                          getProductByBarcode(
                            prodcut.barcode,
                            values,
                            setValues,
                            prodcut,
                            setProduct,
                            setOpen,
                            salesmanRef
                          );
                        } else {
                          getCategoryBarcode(
                            prodcut.barcode,
                            qtyRef,
                            prodcut,
                            setProduct,
                            setOpen
                          );
                        }
                      }
                    }}
                    //   value={values.name}
                    //   onChange={onhandleChange("name")}
                  />
                </Grid>
                <Grid item style={{ marginTop: "1em" }}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={BarcodeName.product}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    value={CategoryBarcode.product}
                    onChange={(e, value) => {
                      if (value?.barcode) {
                        getCategoryBarcode(
                          value.barcode,
                          qtyRef,
                          prodcut,
                          setProduct,
                          setOpen
                        );
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="qty"
                    label="Qty"
                    name="qty"
                    type="Number"
                    inputRef={qtyRef}
                    value={prodcut.qty}
                    onKeyDown={(e) => {
                      if (e.code === "Enter" || e.code === "NumpadEnter") {
                        if (prodcut.qty === "") {
                          setError("Please enter the Qty");
                          setOpen(true);
                        } else {
                          priceRef.current.focus();
                        }
                      }
                    }}
                    onChange={onhandleChange("qty")}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Rate"
                    type="Number"
                    name="price"
                    inputRef={priceRef}
                    value={prodcut.price}
                    onChange={onhandleChange("price")}
                    onKeyDown={onPriceEnterKey}
                  />
                </Grid>
              </Grid>
            </form>
            <TableContainer component={Paper} style={{ height: "46vh" }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>SM</TableCell>
                    <TableCell>Barcode</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>CS</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>GST</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.product.map((proodut, index) => (
                    <TableRow
                      key={index}
                      onClick={(e) => {
                        console.log("aaaa");
                        console.log(index);
                        values.product.splice(index, 1);
                        setValues({ ...values, product: values.product });
                        countTotalAmount();
                      }}
                    >
                      <TableCell>{proodut.salesman}</TableCell>
                      <TableCell>{proodut.barcode}</TableCell>
                      <TableCell>{proodut.name}</TableCell>
                      <TableCell>{proodut.commission}</TableCell>
                      <TableCell>{proodut.qty}</TableCell>
                      <TableCell>{proodut.price}</TableCell>
                      <TableCell>{proodut.gst}</TableCell>
                      <TableCell>{proodut.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                //   size="small"
                onClick={(e) => {
                  e.preventDefault();

                  genrateBill(values, setValues, numberRef, handlePrint);
                }}
                disabled={values.product.length === 0}
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button
                id="printBill"
                variant="contained"
                color="primary"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
                disabled={Bill.bill.product.length === 0}
              >
                Print
              </Button>
            </Grid>
          </Paper>
          {/* <Grid container>
          <Grid></Grid>
        </Grid> */}

          {Bill.bill.product.length !== 0 && (
            <div style={{ display: "none" }}>
              <BillPrint bill={Bill.bill} ref={componentRef} />
            </div>
          )}
        </Container>
      </div>
      {/* {console.log(Bill.bill.product.length)} */}
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Barcode: state.sale.barcode,
  Bill: state.sale.bill,
  CategoryBarcode: state.sale.categoryBarcode,
  BarcodeName: state.sale.barcodeName,
  Exchange: state.sale.exchangeBill,
});
const mapDispatchToProps = (dispatch) => ({
  getProductByBarcode: (
    barcode,
    values,
    setValues,
    prodcut,
    setProduct,
    setOpen,
    salesmanRef
  ) => {
    dispatch(
      getProductByBarcode(
        barcode,
        values,
        setValues,
        prodcut,
        setProduct,
        setOpen,
        salesmanRef
      )
    );
  },
  getCustomer: (values, setValues, salesmanRef, nameRef) => {
    dispatch(getCustomerByPhone(values, setValues, salesmanRef, nameRef));
  },
  addCustomer: (values, setValues, salesmanRef) => {
    dispatch(AddNewCustomer(values, setValues, salesmanRef));
  },
  genrateBill: (values, setValues, numberRef, handlePrint) => {
    dispatch(genrateBill(values, setValues, numberRef, handlePrint));
  },
  getCategoryBarcode: (barcode, qtyRef, prodcut, setProduct, setOpen) => {
    dispatch(getCategoryBarcode(barcode, qtyRef, prodcut, setProduct, setOpen));
  },
  barcodeName: () => {
    dispatch(getCategoryBarcodeName());
  },
  clearBarcode: () => {
    dispatch(getCategoryBarcodeClear());
  },
  getExchangeBillById: (id, setError, setOpen) => {
    dispatch(getExchangeBillById(id, setError, setOpen));
  },
  clearBill: () => {
    dispatch(genrateBillClear());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SalePanel);
