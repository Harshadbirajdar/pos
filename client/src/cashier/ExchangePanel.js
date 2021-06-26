import React, { useState } from "react";
import Base from "../core/Base";
import {
  Container,
  Paper,
  Grid,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { getBillByBarcode } from "../redux/action/exchange";
import { connect } from "react-redux";
import { productState } from "../redux/action/menu";
const ExchangePanel = ({ fetchBillByBarcode, Bill }) => {
  const [id, setId] = useState("60d1e577ede19e33b4db5075");
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogProduct, setDialogProduct] = useState([]);
  const [bill, setBill] = useState("");
  const [serachBarcode, setSerachBarcode] = useState("");
  const [values, setValues] = useState({
    product: [],
  });

  const addProductInArray = (product) => {
    let MainProduct = values.product;
    let localProduct = [];
    if (MainProduct.length === 0) {
      localProduct.push(product);
    } else {
      MainProduct.forEach((mainProduct) => {
        if (
          mainProduct.salesman === product.salesman &&
          mainProduct.barcode === product.barcode
        ) {
          product.qty += mainProduct.qty;
          product.commission += mainProduct.commission;
          product.amount += mainProduct.amount;
          localProduct.push(product);
        } else {
          localProduct.push(mainProduct);
        }
      });
      if (JSON.stringify(localProduct) === JSON.stringify(MainProduct)) {
        localProduct.push(product);
      }
    }
    setValues({ ...values, product: localProduct });
  };

  const CustomeDialog = () => {
    return (
      <Dialog
        open={dialog}
        onClose={() => {
          setDialog(false);
        }}
      >
        <DialogTitle>Select the Product</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableCell>SM</TableCell>
              <TableCell>Barcode</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Amount</TableCell>
            </TableHead>
            {dialogProduct.map((product, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  console.log(product);
                }}
              >
                <TableCell>
                  {" "}
                  <TextField
                    type="number"
                    defaultValue={product.salesman}
                    onChange={(e) => {
                      let products = dialogProduct;
                      products[index].salesman = parseInt(e.target.value);

                      setDialogProduct(products);
                    }}
                  />
                </TableCell>
                <TableCell>{product.barcode}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.commission}</TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.amount}</TableCell>
              </TableRow>
            ))}
          </Table>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  };

  const onEnterSerchBarcode = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      let product = bill.product;
      let exchangeProduct = {};
      let index = product.findIndex((element) => {
        if (element.barcode === serachBarcode) {
          return element;
        }
      });

      if (index !== -1) {
        if (product[index].qty > 1 && !product[index].isQtyOne) {
          exchangeProduct = { ...product[index] };
          let filterProduct = product.filter(
            (element) => element.barcode === serachBarcode
          );

          if (filterProduct === 1) {
            product[index].amount -= product[index].price;
            product[index].commission =
              product[index].commission -
              product[index].commission / product[index].qty;
            product[index].qty--;
            setBill({ ...bill, product });
            exchangeProduct.commission =
              exchangeProduct.commission / exchangeProduct.qty;
            exchangeProduct.qty = 1;
            exchangeProduct.amount = exchangeProduct.price;

            addProductInArray(exchangeProduct);
          } else {
            setDialog(true);
            setDialogProduct(filterProduct);
          }
        } else {
          let filterProduct = product.filter(
            (element) => element.barcode === serachBarcode
          );

          if (filterProduct.length === 1) {
            let deletedProduct = product.splice(index, 1);
            addProductInArray(deletedProduct[0]);
            // setBill({ ...bill, product });
          }
        }

        // setSerachBarcode("");
      } else {
      }
      setSerachBarcode("");
    }
  };
  return (
    <Base title="Exchange">
      {CustomeDialog()}
      <Container>
        <Paper>
          <Grid container spacing={2}>
            <Grid item md={3} style={{ borderRight: "1px solid" }}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Bill Barcode"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter" || e.code === "NumpadEnter") {
                    fetchBillByBarcode(id, setId, setOpen, setBill);
                  }
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Bill Date"
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                label="Bill Number"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                label="Salesman"
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                label="Barcode"
              />
            </Grid>
          </Grid>
          {Object.keys(bill).length !== 0 && (
            <TableContainer component={Paper}>
              <Table aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>SM</TableCell>
                    <TableCell>
                      Barcode
                      <br />
                      <TextField
                        variant="outlined"
                        margin="dense"
                        value={serachBarcode}
                        onChange={(e) => {
                          setSerachBarcode(parseInt(e.target.value));
                        }}
                        onKeyDown={onEnterSerchBarcode}
                        type="number"
                        label="Search Barcode"
                      />
                    </TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>CS</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>GST</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bill.product.map((proodut, index) => (
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
          )}
          <Table>
            <TableHead>
              <TableCell>salesman</TableCell>
              <TableCell>barcode</TableCell>
              <TableCell>name</TableCell>
              <TableCell>commission</TableCell>
              <TableCell>qty</TableCell>
              <TableCell>price</TableCell>
              <TableCell>gst</TableCell>
              <TableCell>amount</TableCell>
            </TableHead>
            <TableBody>
              {values.product.length !== 0 &&
                values.product.map((proodut, index) => (
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
        </Paper>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Bill: state.exchange.bill,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBillByBarcode: (id, setId, setOpen, setBill) => {
    dispatch(getBillByBarcode(id, setId, setOpen, setBill));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ExchangePanel);
