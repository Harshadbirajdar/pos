import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import Base from "../core/Base";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { getBillReport } from "../redux/action/report";
import VisibilityIcon from "@material-ui/icons/Visibility";
import moment from "moment";
import BillPrint from "../components/BillPrint";
import { useReactToPrint } from "react-to-print";
import { ExportCsv } from "../components/ExportCsv";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const SaleReport = ({ fetchBillReport, Bill }) => {
  const [values, setValues] = useState({
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
    sort: "asc",
  });
  useEffect(() => {
    fetchBillReport(
      Bill.rowPerPage,
      Bill.page,
      values.startDate,
      values.endDate,
      values.sort
    );
  }, [values]);
  const componentRef = useRef();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(`@page { size:79mm 551px;margin:0}`);
  const [test, setTest] = useState(0);
  useEffect(() => {
    console.log(componentRef.current?.clientHeight);
    let a = document.getElementById("testd");
    console.log(a?.clientHeight);
    setPage(
      `@page { size:79mm ${componentRef.current?.clientHeight + 25}px;margin:0}`
    );
  }, []);
  const [detail, setDetail] = useState("");
  console.log(componentRef.current?.clientHeight);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { size:79mm ${
      document.getElementById("testd")?.clientHeight
    }px;margin:0}`,
    onAfterPrint: () => {
      // setDialog(false);
      // clearCustomer();
    },
  });

  const CustomeDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Invoice</DialogTitle>
        <DialogContent id="testd">
          {}
          <BillPrint bill={detail} ref={componentRef} test={setTest} />
          {/* {setTest(componentRef.current?.clientHeight)} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePrint} color="primary">
            Print
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Base title="Sale Report">
      <Container>
        {CustomeDialog()}
        <Paper>
          <ExportCsv csvData={Bill.bill} fileName="test" />
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
            <Grid item md={2} style={{ marginTop: "1em" }}>
              <FormControl
                fullWidth
                //  className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.sort}
                  onChange={(e) => {
                    setValues({ ...values, sort: e.target.value });
                  }}
                >
                  <MenuItem value={"asc"}>Asc</MenuItem>
                  <MenuItem value={"desc"}>Dsec</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        <TableContainer component={Paper} style={{ maxWidth: "90vw" }}>
          <Table>
            <TableHead stickyHeader>
              <TableRow>
                <TableCell>Bill No</TableCell>
                <TableCell>Total Qty</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Bill.bill.length !== 0 &&
                Bill.bill.map((bill, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{bill.billNo}</TableCell>
                      <TableCell>{bill.product.length}</TableCell>
                      <TableCell>{bill.amount}</TableCell>
                      <TableCell>
                        {moment(bill.createdAt).format("DD/MM/YYYY (hh:mm:A)")}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          aria-label="View Invoice"
                          onClick={(e) => {
                            setDetail(bill);
                            // setTest(componentRef.current.clientHeight);
                            setOpen(true);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPage={Bill.rowPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            count={Bill.totalCount}
            page={Bill.page}
            onChangeRowsPerPage={(e, rowPerPage) => {
              fetchBillReport(
                rowPerPage.props.value,
                Bill.page,
                values.startDate,
                values.endDate,
                values.sort
              );
            }}
            onChangePage={(event, page) => {
              fetchBillReport(
                Bill.rowPerPage,
                page,
                values.startDate,
                values.endDate,
                values.sort
              );
            }}
            component="div"
          ></TablePagination>
        </TableContainer>
      </Container>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  Bill: state.report.bill,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBillReport: (rowPerPage, page, startDate, endDate, sort) => {
    dispatch(getBillReport(rowPerPage, page, startDate, endDate, sort));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleReport);
