import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { connect } from "react-redux";
import Base from "../core/Base";
import { getAllCustomer } from "../redux/action/customer";
import moment from "moment";
const ViewCustomer = ({ Customer, fetchCustomer }) => {
  useEffect(() => {
    fetchCustomer(Customer.rowPerPage, Customer.page);
  }, []);
  return (
    <Base title="View Customer">
      <TableContainer component={Paper} style={{ maxWidth: "90vw" }}>
        <Table>
          <TableHead stickyHeader>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Total Bill</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Customer.customer.length !== 0 &&
              Customer.customer.map((customer, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>{customer.purchase.length}</TableCell>
                    <TableCell>
                      {moment(customer.purchase.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPage={Customer.rowPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          count={Customer.totalCount}
          page={Customer.page}
          onChangeRowsPerPage={(e, rowPerPage) => {
            fetchCustomer(rowPerPage.props.value, Customer.page);
          }}
          onChangePage={(event, page) => {
            fetchCustomer(Customer.rowPerPage, page);
          }}
          component="div"
        ></TablePagination>
      </TableContainer>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  Customer: state.customer.viewCustomer,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCustomer: (rowPerPage, page) => {
    dispatch(getAllCustomer(rowPerPage, page));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomer);
