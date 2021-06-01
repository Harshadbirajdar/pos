import {
  Container,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  Paper,
  TableBody,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../apicall";
import { API } from "../backend";
import Base from "../core/Base";
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
const PurchaseEntry = () => {
  const { user, token } = isAuthenticated();

  const classes = useStyles();
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
  ];
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [values, setValues] = useState({
    supplier: "",
    billNo: "",
    mrp: "",
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
    if (products.category == "") {
      setOpen("Please select the category");
      return true;
    }
    if (products.firstLine == "") {
      setOpen("Please enter the First Line");
      return true;
    }
    if (products.qty == "") {
      setOpen("Please enter the Quantity");
      return true;
    }
    if (products.price == "") {
      setOpen("Please enter the MRP");
      return true;
    }
    if (products.sgst == "") {
      setOpen("Please enter the SGST");
      return true;
    }
    if (products.cgst == "") {
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
    });
  };

  return (
    <Base title="Purchase Entry">
      <Container maxWidth="xl">
        {errorMsg()}
        <Grid container spacing={2}>
          <Grid item md={4} style={{ marginTop: "1em" }}>
            <Autocomplete
              id="combo-box-demo"
              options={suppliers}
              getOptionLabel={(option) => option.name}
              //   style={{ width: 300 }}
              onChange={(event, newValues) => {
                setValues({ ...values, supplier: newValues?._id });
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
              value={values.totalQty}
              onChange={onhandleChange("totalQty")}
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
          <Grid item md={2}>
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
              label="Pur Rate"
              type="Number"
              value={products.purchase}
              onChange={(e) => {
                let pc = (products.percentage * e.target.value) / 100;

                setProducts({
                  ...products,
                  purchase: e.target.value,
                  price: parseInt(pc) + parseInt(e.target.value),
                  secondLine: convertCode(e.target.value),
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
                  price: parseFloat(pc) + parseFloat(products.purchase),
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
        >
          Save
        </Button>
      </Container>
    </Base>
  );
};

export default PurchaseEntry;
