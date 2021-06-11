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

import {
  AddNewCustomer,
  genrateBill,
  getCustomerByPhone,
  getProductByBarcode,
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
}) => {
  const componentRef = useRef();
  const [page, setPage] = useState(`@page { size:79mm 200px;margin:0}`);
  // const pageStyle = page;
  useEffect(() => {
    setPage(
      `@page { size:79mm ${componentRef.current?.clientHeight + 25}px;margin:0}`
    );
  }, [Bill.bill.product.length]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: page,
    onAfterPrint: () => {
      // setDialog(false);
      // clearCustomer();
    },
    onBeforeGetContent: (a) => {
      console.log(a);
    },
  });

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
  ];
  const classes = useStyles();
  const [values, setValues] = useState({
    product: [],
    // customer: {
    //   name: "",
    //   phoneNumber: "",
    // },
    amount: 0,
  });
  const [prodcut, setProduct] = useState({
    salesman: "",
    barcode: "",
    price: "",
    qty: "",
  });
  const inputRef = useRef();
  const salesmanRef = useRef();
  const formRef = useRef();
  const nameRef = useRef();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // document.addEventListener("keydown", (event) => {
  //   console.log(event.code);
  //   // alert(`Key pressed  \r\n Key code value: ${event.code}`);
  // });
  const errorMsg = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {Barcode.error}
        </Alert>
      </Snackbar>
    );
  };
  const onhandleChange = (name) => (event) => {
    setProduct({ ...prodcut, [name]: event.target.value });
  };

  useEffect(() => {
    setValues({
      ...values,
      amount: values.product.reduce((a, b) => a + b.amount, 0),
    });
  }, [values.product]);
  return (
    <Base title="Sale Panel">
      <div
        onKeyDown={(e) => {
          console.log(e);
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
                    onKeyPress={(e) => {
                      if (e.code === "Enter" || e.code === "NumpadEnter") {
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
                    onKeyPress={(e) => {
                      if (e.charCode === 13) {
                        addCustomer(values, setValues, salesmanRef);
                      }
                    }}
                  />
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
                    <h1>{values.amount}</h1>
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
                    onKeyPress={(e) => {
                      if (e.charCode === 13) {
                        inputRef.current.focus();
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
                    type="Number"
                    value={prodcut.barcode}
                    inputRef={inputRef}
                    onChange={onhandleChange("barcode")}
                    onKeyPress={(e) => {
                      if (e.charCode === 13) {
                        getProductByBarcode(
                          prodcut.barcode,
                          values,
                          setValues,
                          prodcut,
                          setProduct,
                          setOpen,
                          salesmanRef
                        );
                      }
                    }}
                    //   value={values.name}
                    //   onChange={onhandleChange("name")}
                  />
                </Grid>
                <Grid item style={{ marginTop: "1em" }}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Combo box"
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
                    value={prodcut.qty}
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
                    //   value={values.name}
                    //   onChange={onhandleChange("name")}
                  />
                </Grid>
              </Grid>
            </form>
            <TableContainer component={Paper}>
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
                    <TableRow key={index}>
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

            <Button
              variant="contained"
              color="primary"
              //   size="small"
              onClick={(e) => {
                e.preventDefault();

                genrateBill(values, setValues);
              }}
              disabled={values.product.length === 0}
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Paper>
          {/* <Grid container>
          <Grid></Grid>
        </Grid> */}
          {console.log(Bill.bill.product.length)}
          {Bill.bill.product.length !== 0 && (
            <BillPrint bill={Bill.bill} ref={componentRef} />
          )}
          <button onClick={handlePrint}></button>
        </Container>
      </div>
      {/* {console.log(Bill.bill.product.length)} */}
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Barcode: state.sale.barcode,
  Bill: state.sale.bill,
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
  genrateBill: (values, setValues) => {
    dispatch(genrateBill(values, setValues));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SalePanel);
