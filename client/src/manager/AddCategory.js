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
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";
import { addCategory } from "../redux/action/category";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(3),
  },
}));
const AddCategory = ({ category, addCategory }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    commision: "",
    commisionBase: 0,
    hsn: "",
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
    if (category.error) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {category.error}
          </Alert>
        </Snackbar>
      );
    } else if (category.success) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {`${category.category.name} is added successfully`}
          </Alert>
        </Snackbar>
      );
    }
  };
  return (
    <Base>
      <Container maxWidth="md">
        {msg()}
        <Paper className={classes.root}>
          <form noValidate>
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
            <Button
              variant="contained"
              color="primary"
              //   size="small"
              onClick={(e) => {
                e.preventDefault();

                addCategory(values, setValues, setOpen);
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
  category: state.category,
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (values, setValues, setOpen) => {
    dispatch(addCategory(values, setValues, setOpen));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
