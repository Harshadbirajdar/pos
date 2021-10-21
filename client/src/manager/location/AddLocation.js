import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import Base from "../../core/Base";
import SaveIcon from "@material-ui/icons/Save";
import { addNewLocation } from "../../redux/action/location";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(3),
  },
}));
const AddLocation = ({ Location, addNewLocation }) => {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const msg = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={Location.error ? "error" : "success"}
        >
          {Location.error
            ? Location.error
            : `${Location.location?.name} Location Added Successfully...`}
        </Alert>
      </Snackbar>
    );
  };
  return (
    <Base title="Add Location">
      {msg()}
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Grid container>
            <Grid item md={12} spacing={2}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Location Name"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </Grid>
            <Grid>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                className={classes.button}
                color="primary"
                disabled={Location.loading}
                onClick={(e) => {
                  e.preventDefault();
                  addNewLocation(location, setLocation, setOpen);
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Location: state.location.add,
});

const mapDispatchToProps = (dispatch) => ({
  addNewLocation: (location, setLocation, setOpen) => {
    dispatch(addNewLocation(location, setLocation, setOpen));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);
