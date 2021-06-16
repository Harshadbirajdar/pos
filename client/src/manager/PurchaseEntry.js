import {
  Container,
  TextField,
  makeStyles,
  Grid,
  Button,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  Paper,
  TableBody,
  Snackbar,
} from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import { Alert, Autocomplete } from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";
import { useReactToPrint } from "react-to-print";

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { isAuthenticated } from "../apicall";
import { API } from "../backend";
import Base from "../core/Base";
import { purchaseEntry } from "../redux/action/purchase";
import { connect } from "react-redux";
import BarcodePrint from "../components/BarcodePrint";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(3),
  },
  table: {
    maxHeight: "10px",
  },
}));
const PurchaseEntry = ({ purchaseEntry, Product }) => {
  const { user, token } = isAuthenticated();

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [values, setValues] = useState({
    supplier: "",
    billNo: "",

    billDate: "",
    billAmount: "",
    sgst: "",
    cgst: "",
    igst: "",
    transportName: "",
    transportPrice: "",
    lrNo: "",
    transportDate: "",
    totalQty: "",
    withoutGst: "",
    product: [],
  });
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState({
    category: "",
    price: "",
    qty: "",
    hsn: "",
    cgst: "",
    sgst: "",
    firstLine: "",
    secondLine: "",
    percentage: "",
    purchase: "",
    size: "",
    thirdLine: "",
  });
  const getAllSupplier = (name = "") => {
    axios
      .get(`${API}/${user._id}/supplier/name?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuppliers(response.data);
      });
  };

  const getAllCategory = () => {
    axios
      .get(`${API}/${user._id}/category/name`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategory(response.data);
      });
  };

  useEffect(() => {
    getAllSupplier();
    getAllCategory();
  }, []);
  const onhandleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const onhandleProductChange = (name) => (e) => {
    setProducts({ ...products, [name]: e.target.value });
  };
  const convertCode = (number) => {
    const code = ["L", "B", "H", "A", "N", "D", "R", "I", "M", "O"];
    let numberArray = [...number.toString()];
    let encodeNumber = "";
    numberArray.map((v, index) => {
      encodeNumber += code[v];
    });
    return encodeNumber;
  };
  const round = (numbe) => {
    let number = Math.ceil(numbe);
    let a = (number / 10).toString().split(".");
    if (number % 100 === 0) {
      return number - 1;
    }

    if (number.legnth === 1) {
      return number;
    }

    if (a[1] > 5) {
      return (a[0] * 10 + 10) % 100 === 0 ? a[0] * 10 + 9 : a[0] * 10 + 10;
    } else {
      return (a[0] * 10) % 100 === 0 ? a[0] * 10 - 1 : a[0] * 10;
    }
  };
  const Tables = () => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category </TableCell>
              <TableCell>First Line</TableCell>
              <TableCell>Second Line</TableCell>

              <TableCell>Qty</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>MRP</TableCell>
              <TableCell>SGST</TableCell>
              <TableCell>CGST</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.product.map((product, index) => (
              <TableRow
                key={index}
                onClick={(e) => {
                  let product = values.product;
                  console.log(product[index]);
                  setProducts({ ...product[index] });
                  product.splice(index, 1);
                  setValues({ ...values, product });
                }}
              >
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.firstLine}</TableCell>
                <TableCell>{product.secondLine}</TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>{product.size}</TableCell>

                <TableCell>{product.price}</TableCell>
                <TableCell>{product.sgst}</TableCell>
                <TableCell>{product.cgst}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const errorMsg = () => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {open}
        </Alert>
      </Snackbar>
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onAddClick = (e) => {
    e.preventDefault();
    if (products.category === "") {
      setOpen("Please select the category");
      return true;
    }
    if (products.firstLine === "") {
      setOpen("Please enter the First Line");
      return true;
    }
    if (products.qty === "") {
      setOpen("Please enter the Quantity");
      return true;
    }
    if (products.price === "") {
      setOpen("Please enter the MRP");
      return true;
    }
    if (products.sgst === "") {
      setOpen("Please enter the SGST");
      return true;
    }
    if (products.cgst === "") {
      setOpen("Please enter the CGST");
      return true;
    }

    let product = values.product;

    product.push(products);

    setValues({ ...values, product });

    setProducts({
      category: "",
      price: "",
      qty: "",
      hsn: "",
      cgst: "",
      sgst: "",
      firstLine: "",
      secondLine: "",
      percentage: "",
      purchase: "",
      size: "",
    });
  };

  const componentRef = useRef();
  const pageStyle = "@page { size:83mm 42.2mm;margin:0}";
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
    onAfterPrint: () => {
      // setDialog(false);
      // clearCustomer();
    },
    onBeforeGetContent: (a) => {
      console.log(a);
    },
  });
  return (
    <Base title="Purchase Entry">
      <Container maxWidth="xl">
        {errorMsg()}
        <Grid container spacing={2}>
          <Grid item md={4} style={{ marginTop: "1em" }}>
            <Autocomplete
              id="combo-box-demo"
              options={suppliers}
              value={values.supplier}
              getOptionLabel={(option) => option.name}
              //   style={{ width: 300 }}
              onChange={(event, newValues) => {
                setValues({ ...values, supplier: newValues });
              }}
              onInputChange={(e, newInput) => {
                getAllSupplier(newInput);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Supplier" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Bill No"
              value={values.billNo}
              onChange={onhandleChange("billNo")}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="date"
              label="Bill Date"
              value={values.billDate}
              onChange={onhandleChange("billDate")}
              InputLabelProps={{
                shrink: true,
              }}
              //   value={values.name}
              //   onChange={onhandleChange("name")}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Amount"
              value={values.billAmount}
              onChange={(e) => {
                let calculate =
                  e.target.value - values.cgst - values.sgst - values.igst;
                setValues({
                  ...values,
                  billAmount: e.target.value,
                  withoutGst: calculate,
                });
              }}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="SGST"
              value={values.sgst}
              onChange={(e) => {
                let calculate =
                  values.billAmount -
                  e.target.value -
                  values.cgst -
                  values.igst;
                setValues({
                  ...values,
                  sgst: e.target.value,
                  withoutGst: calculate,
                });
              }}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="CGST"
              value={values.cgst}
              onChange={(e) => {
                let calculate =
                  values.billAmount -
                  e.target.value -
                  values.sgst -
                  values.igst;
                setValues({
                  ...values,
                  cgst: e.target.value,
                  withoutGst: calculate,
                });
              }}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="IGST"
              value={values.igst}
              onChange={(e) => {
                let calculate =
                  values.billAmount -
                  e.target.value -
                  values.sgst -
                  values.cgst;
                setValues({
                  ...values,
                  igst: e.target.value,
                  withoutGst: calculate,
                });
              }}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Transpoart Name"
              value={values.transportName}
              onChange={onhandleChange("transportName")}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="LR No"
              value={values.lrNo}
              onChange={onhandleChange("lrNo")}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="date"
              label=" Date"
              InputLabelProps={{
                shrink: true,
              }}
              value={values.transportDate}
              onChange={onhandleChange("transportDate")}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              label=" Amount"
              value={values.transportPrice}
              onChange={onhandleChange("transportPrice")}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              label="Without GST Amount"
              value={values.withoutGst}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              label="Total Qty"
              value={values.product.reduce((a, b) => a + parseInt(b.qty), 0)}
            />
          </Grid>
        </Grid>

        <hr />
        <Grid container spacing={2}>
          <Grid item md={2} style={{ marginTop: "1em" }}>
            <Autocomplete
              id="combo-box-demo"
              options={category}
              value={products.category}
              onChange={(e, newValue) => {
                setProducts({
                  ...products,
                  category: newValue,
                });
              }}
              getOptionLabel={(option) => option.name}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="First Line"
              value={products.firstLine}
              onChange={onhandleProductChange("firstLine")}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Second Line"
              value={products.secondLine}
              onChange={onhandleProductChange("secondLine")}
            />
          </Grid>

          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Qty"
              type="Number"
              value={products.qty}
              onChange={onhandleProductChange("qty")}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Size"
              value={products.size}
              onChange={onhandleProductChange("size")}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Pur Rate"
              type="Number"
              value={products.purchase}
              onChange={(e) => {
                let pc = (products.percentage * e.target.value) / 100;
                console.log(values.supplier);
                setProducts({
                  ...products,
                  purchase: e.target.value,
                  price: round(parseInt(pc) + parseInt(e.target.value)),
                  thirdLine:
                    values.supplier === "" || values.supplier === undefined
                      ? convertCode(e.target.value)
                      : convertCode(e.target.value) +
                        "-" +
                        values.supplier?.shortName,
                });
              }}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="% per"
              type="Number"
              value={products.percentage}
              onChange={(e) => {
                let pc = (products.purchase * e.target.value) / 100;

                setProducts({
                  ...products,
                  percentage: e.target.value,
                  price: round(parseFloat(pc) + parseFloat(products.purchase)),
                });
              }}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="MRP"
              type="Number"
              value={products.price}
              onChange={onhandleProductChange("price")}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="SGST"
              type="Number"
              value={products.sgst}
              onChange={onhandleProductChange("sgst")}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="CGST"
              type="Number"
              value={products.cgst}
              onChange={onhandleProductChange("cgst")}
            />
          </Grid>

          <Grid item md={1} style={{ marginTop: "1.5em" }}>
            <Button variant="contained" onClick={onAddClick}>
              Add
            </Button>
          </Grid>
        </Grid>
        {Tables()}
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          disabled={values.product.length === 0}
          onClick={(e) => {
            e.preventDefault();
            // handlePrint();
            purchaseEntry(values, setValues);
          }}
        >
          Save
        </Button>
        {console.log(Object.keys(Product.product).length)}
        {Object.keys(Product.product).length !== 0 && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<PrintIcon />}
            onClick={(e) => {
              e.preventDefault();
              handlePrint();
              // purchaseEntry(values, setValues);
            }}
          >
            Print
          </Button>
        )}
        <div style={{ display: "none" }}>
          <BarcodePrint ref={componentRef} product={Product.product} />
        </div>
      </Container>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  Product: state.purchase,
});
const mapDispatchToProps = (dispatch) => ({
  purchaseEntry: (values, setValues) => {
    dispatch(purchaseEntry(values, setValues));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseEntry);
