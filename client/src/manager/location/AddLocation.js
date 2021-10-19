import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React from "react";
import Base from "../../core/Base";
import SaveIcon from "@material-ui/icons/Save";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(3),
  },
}));
const AddLocation = () => {
  const classes = useStyles();

  return (
    <Base title="Add Location">
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Grid container>
            <Grid item md={12} spacing={2}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Location Name"
                // value={values.address}

                //   value={values.name}
                // onChange={onhandleChange("address")}
              />
            </Grid>
            <Grid>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                className={classes.button}
                color="primary"
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

export default AddLocation;
