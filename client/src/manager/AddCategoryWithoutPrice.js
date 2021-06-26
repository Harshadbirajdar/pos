import React, { useState } from "react";
import Base from "../core/Base";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  makeStyles,
  Snackbar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";
import { addCategory, getCategoryBarcode } from "../redux/action/category";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(3),
  },
}));
const AddCategoryWithoutPrice = ({ createCategory, Category }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    commision: "",
    barcode: "",
    commisionBase: 0,
    hsn: "",
    gstAmount: "",
    gstGreater: "",
    gstLesser: "",
    isQtyOne: false,
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
    if (Category.error) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {Category.error}
          </Alert>
        </Snackbar>
      );
    } else if (Category.success) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {`${Category.category.name} is added successfully`}
          </Alert>
        </Snackbar>
      );
    }
  };
  return (
    <Base title="Add Category">
      <Container maxWidth="md">
        {msg()}
        <Paper className={classes.root}>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Category Name"
                  value={values.name}
                  onChange={onhandleChange("name")}
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Barcode "
                  value={values.barcode}
                  onChange={onhandleChange("barcode")}
                  autoFocus
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isQtyOne}
                  onChange={() => {
                    setValues({ ...values, isQtyOne: !values.isQtyOne });
                  }}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Count Quantity is One"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="Number"
              label="HSN Code"
              value={values.hsn}
              onChange={onhandleChange("hsn")}
              autoFocus
            />
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Commision"
                  value={values.commision}
                  onChange={onhandleChange("commision")}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControl
                  style={{ marginTop: "1em" }}
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                >
                  <InputLabel>Commision By</InputLabel>
                  <Select
                    native
                    value={values.commisionBase}
                    onChange={(e) => {
                      setValues({ ...values, commisionBase: e.target.value });
                    }}
                    label="Commision By"
                  >
                    <option value={0}>% Percentage</option>
                    <option value={1}>= Fixed</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item md={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="GST Amount"
                  value={values.gstAmount}
                  onChange={onhandleChange("gstAmount")}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Amount Greater GST %"
                  value={values.gstGreater}
                  onChange={onhandleChange("gstGreater")}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Amount Lesser GST %"
                  value={values.gstLesser}
                  onChange={onhandleChange("gstLesser")}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              //   size="small"
              onClick={(e) => {
                e.preventDefault();

                createCategory(values, setValues, setOpen);
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
  Category: state.category.barcode,
});

const mapDispatchToProps = (dispatch) => ({
  createCategory: (values, setValues, setOpen) => {
    dispatch(getCategoryBarcode(values, setValues, setOpen));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryWithoutPrice);
