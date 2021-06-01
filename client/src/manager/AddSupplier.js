import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import Base from "../core/Base";
import SaveIcon from "@material-ui/icons/Save";
import { addSupplier } from "../redux/action/supplier";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(3),
  },
}));
const AddSupplier = ({ addSupplier, supplier }) => {
  const classes = useStyles();
  const state = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];
  const [values, setValues] = useState({
    name: "",
    contactNumber: "",
    shortName: "",
    state: "",
    address: "",
  });
  const [open, setOpen] = useState(false);

  const onhandleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const msg = () => {
    if (supplier.error) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {supplier.error}
          </Alert>
        </Snackbar>
      );
    } else if (supplier.success) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {`${supplier.supplier.name} is added successfully`}
          </Alert>
        </Snackbar>
      );
    }
  };
  return (
    <Base title="Add Supplier">
      <Container maxWidth="md">
        <Paper className={classes.root}>
          {msg()}
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item md={8} sm={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Supplier Name"
                  name="Customer Name"
                  value={values.name}
                  onChange={onhandleChange("name")}
                  autoFocus
                />
              </Grid>
              <Grid item md={4} sm={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 3,
                  }}
                  label="Supplier Short Name"
                  value={values.shortName}
                  onChange={onhandleChange("shortName")}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Contact Number"
                  name="Customer Name"
                  value={values.contactNumber}
                  onChange={onhandleChange("contactNumber")}
                />
              </Grid>
              <Grid item md={6} sm={12} style={{ marginTop: "1em" }}>
                <Autocomplete
                  id="combo-box-demo"
                  options={state}
                  inputValue={values.state}
                  onInputChange={(event, newInputValue) => {
                    // setInputValue(newInputValue);
                    setValues({ ...values, state: newInputValue });
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField {...params} label="State" variant="outlined" />
                  )}
                />
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Address"
              name="Customer Name"
              value={values.address}
              multiline
              rows={4}
              //   value={values.name}
              onChange={onhandleChange("address")}
            />
            <Button
              variant="contained"
              color="primary"
              //   size="small"
              onClick={(e) => {
                e.preventDefault();
                addSupplier(values, setValues, setOpen);
              }}
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </form>
        </Paper>
      </Container>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  supplier: state.supplier,
});

const mapDispatchToProps = (dispatch) => ({
  addSupplier: (values, setValues, setOpen) => {
    dispatch(addSupplier(values, setValues, setOpen));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSupplier);
