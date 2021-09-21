import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Base from "../core/Base";
import { getSalesmanReport } from "../redux/action/report";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

const SalesmanReport = ({ fetchCommission, Salesman }) => {
  const [values, setValues] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
  });
  useEffect(() => {
    fetchCommission(values.startDate, values.endDate);
  }, [values]);
  return (
    <Base title="Salesman Report">
      <Grid container justify="space-around">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item md={2}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Start"
              format="dd/MM/yyyy"
              value={values.startDate}
              onChange={(e) => {
                setValues({
                  ...values,
                  startDate: moment(e).format("YYYY-MM-DD"),
                });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item md={2}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="End"
              format="dd/MM/yyyy"
              value={values.endDate}
              onChange={(e) => {
                setValues({
                  ...values,
                  endDate: moment(e).format("YYYY-MM-DD"),
                });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
      <TableContainer component={Paper} style={{ maxWidth: "90vw" }}>
        <Table>
          <TableHead stickyHeader>
            <TableRow>
              <TableCell>Salesman Number</TableCell>
              <TableCell>Commission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(Salesman.salesman).map((salesman, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{salesman[0]}</TableCell>
                  <TableCell>{salesman[1]}</TableCell>
                </TableRow>
              );
            })}
            {console.log(Salesman.salesman)}
          </TableBody>
        </Table>
      </TableContainer>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  Salesman: state.report.salesman,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCommission: (startDate, endDate) => {
    dispatch(getSalesmanReport(startDate, endDate));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SalesmanReport);
