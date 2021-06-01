import {
  Table,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  Paper,
  TablePagination,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { isAuthenticated } from "../apicall";
import Base from "../core/Base";
import { getAllSupplier } from "../redux/action/supplier";

const ViewSupplier = ({ getAllSupplier, supplier }) => {
  useEffect(() => {
    getAllSupplier(supplier.rowPerPage, supplier.page);
  }, []);
  return (
    <Base title="View Supplier">
      {console.log(isAuthenticated())}
      <TableContainer component={Paper} style={{ maxWidth: "90vw" }}>
        <Table>
          <TableHead stickyHeader>
            <TableRow>
              <TableCell style={{ minWidth: 170 }}>Supplier Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Short Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supplier.suppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactNumber}</TableCell>
                <TableCell>{supplier.shortName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPage={supplier.rowPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          onChangeRowsPerPage={(e, rowPerPage) => {
            getAllSupplier(rowPerPage.props.value, supplier.page);
          }}
          count={supplier.totalCount}
          page={supplier.page}
          onChangePage={(event, page) => {
            getAllSupplier(supplier.rowPerPage, page);
          }}
          component="div"
        />
      </TableContainer>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  supplier: state.supplier,
});
const mapDispatchToProps = (dispatch) => ({
  getAllSupplier: (rowPerPage, page) => {
    dispatch(getAllSupplier(rowPerPage, page));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewSupplier);
