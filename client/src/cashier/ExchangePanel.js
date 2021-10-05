import React, { useState, useRef, useEffect } from "react";
import BillPrint from "../components/BillPrint";
import { useReactToPrint } from "react-to-print";

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
  Fab,
  DialogTitle,
} from "@material-ui/core";
import { exchangeBill, getBillByBarcode } from "../redux/action/exchange";
import { connect } from "react-redux";
import { productState } from "../redux/action/menu";
import { Autocomplete } from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";

const ExchangePanel = ({
  fetchBillByBarcode,
  Bill,
  genrateBill,
  ExchangeBill,
}) => {
  const componentRef = useRef();
  const [page, setPage] = useState(`@page { size:79mm 200px;margin:0}`);
  // const pageStyle = page;
  // useEffect(() => {
  //   setPage(
  //     `@page { size:79mm ${componentRef.current?.clientHeight + 25}px;margin:0}`
  //   );
  // }, [ExchangeBill.bill?.product?.length]);
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

  // print ended
  const [id, setId] = useState("6159ce8c8cdbf540646121bd");
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogProduct, setDialogProduct] = useState([]);
  const [bill, setBill] = useState("");
  const [serachBarcode, setSerachBarcode] = useState("");
  const [values, setValues] = useState({
    product: [],
    amount: 0,
  });
  useEffect(() => {
    countTotalAmount();
  }, [values.product]);
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
    debugger;
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
              <TableCell>Action</TableCell>
            </TableHead>
            {dialogProduct.map((product, index) => (
              <TableRow key={index}>
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
                <TableCell
                  onClick={() => {
                    addProductInArray(product);
                    let products = bill.product;
                    let index = products.findIndex((element) => {
                      if (
                        element.barcode === product.barcode &&
                        element.salesman === product.salesman
                      ) {
                        return element;
                      }
                    });
                    if (index !== -1) {
                      products.splice(index, 1);
                      setBill({ ...bill, product: products });
                    } else {
                      let index = products.findIndex((element) => {
                        if (element.barcode === products.barcode) {
                          return element;
                        }
                      });
                      products.splice(index, 1);
                      setBill({ ...bill, product: products });
                    }
                    setDialog(false);
                  }}
                >
                  *
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  };
  const countTotalAmount = () => {
    setValues({
      ...values,
      amount: values.product.reduce((a, b) => a + b.amount, 0),
    });
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
        console.log(product[index]);
        if (product[index].qty > 1 && !product[index].isQtyOne) {
          exchangeProduct = { ...product[index] };
          let filterProduct = product.filter(
            (element) => element.barcode === serachBarcode
          );

          if (filterProduct.length === 1) {
            console.log(filterProduct);
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
            setBill({ ...bill, product });
          } else {
            setDialog(true);
            setDialogProduct(filterProduct);
          }
        }

        // setSerachBarcode("");
      } else {
      }
      setSerachBarcode("");
    }
  };
  return (
    <Base title="Exchange" exchange={true}>
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
            <Grid item md={2}>
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
            <Grid item style={{ marginTop: "1em" }}>
              <Autocomplete
                id="combo-box-demo"
                // options={BarcodeName.product}
                // getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                // value={CategoryBarcode.product}
                // onChange={(e, value) => {
                //   getCategoryBarcode(
                //     value.barcode,
                //     qtyRef,
                //     prodcut,
                //     setProduct,
                //     setOpen
                //   );
                // }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                label="Qty"
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                label="Price"
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
        <Fab
          variant="extended"
          color="primary"
          style={{ position: "absolute", bottom: "1.5em", right: "1.5em" }}
          onClick={(e) => {
            e.preventDefault();
            genrateBill(values, setValues, setBill);
          }}
        >
          <SaveIcon />
          Save
        </Fab>
        {ExchangeBill.bill.product.length !== 0 && (
          <div>
            <BillPrint bill={ExchangeBill.bill} ref={componentRef} />
          </div>
        )}
        {console.log("ExchangeBill.bill", ExchangeBill.bill)}
        <button onClick={handlePrint}></button>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Bill: state.exchange.bill,
  ExchangeBill: state.exchange.exchangeBill,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBillByBarcode: (id, setId, setOpen, setBill) => {
    dispatch(getBillByBarcode(id, setId, setOpen, setBill));
  },
  genrateBill: (values, setValues, setBill) => {
    dispatch(exchangeBill(values, setValues, setBill));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ExchangePanel);
