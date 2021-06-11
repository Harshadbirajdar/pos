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
import { Alert } from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";
import { addSalesman } from "../redux/action/salesman";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(3),
  },
}));
const AddSalesman = ({ addSalesman, Salesman }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    id: "",
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
    if (Salesman.error) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {Salesman.error}
          </Alert>
        </Snackbar>
      );
    } else if (Salesman.success) {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {`${Salesman.salesman.name} is added successfully`}
          </Alert>
        </Snackbar>
      );
    }
  };
  return (
    <Base title="Add Salesman">
      <Container maxWidth="md">
        {msg()}
        <Paper className={classes.root}>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="Number"
              label="Salesman Id"
              value={values.id}
              onChange={onhandleChange("id")}
              autoFocus
            />
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Salseman Name"
                  value={values.name}
                  onChange={onhandleChange("name")}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChange={onhandleChange("phoneNumber")}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.preventDefault();

                addSalesman(values, setValues, setOpen);
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
  Salesman: state.salesman.addSalesman,
});
const mapDispatchToProps = (dispatch) => ({
  addSalesman: (values, setValues, setOpen) => {
    dispatch(addSalesman(values, setValues, setOpen));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddSalesman);
