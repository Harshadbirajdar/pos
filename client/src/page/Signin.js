import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { fetchAllLocation, signin } from "../apicall";
import { Alert } from "@material-ui/lab";
import { authenticated } from "../apicall";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Signin = ({ history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    userName: "",
    password: "",
    loading: false,
    error: false,
    success: false,
  });

  const [location, setLocation] = useState([]);
  const [locationValue, setLocationValue] = useState("");
  const onhandleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false, success: false });
    signin(values).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          success: false,
        });
      } else {
        setValues({ ...values, loading: false, error: false, success: true });
        if (locationValue !== "") {
          localStorage.setItem("location", JSON.stringify(locationValue));
        }
        authenticated(data, () => {
          history.push("/");
        });
      }
    });
  };

  useEffect(() => {
    fetchAllLocation().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setLocation(data);
      }
    });
  }, []);
  const handleChange = (e) => {
    setLocationValue(e.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {values.error && <Alert severity="error">{values.error}</Alert>}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="UserName"
            value={values.userName}
            onChange={onhandleChange("userName")}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={values.password}
            onChange={onhandleChange("password")}
            autoComplete="current-password"
          />
          {!localStorage.getItem("location") && (
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={locationValue}
                label="Location"
                onChange={handleChange}
              >
                {location.map((locations) => (
                  <MenuItem key={locations._id} value={locations}>
                    {locations.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            className={classes.submit}
            disabled={values.loading}
          >
            {values.loading ? "Please Wait" : "Sign In"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Signin;
