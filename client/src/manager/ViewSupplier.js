import {
  Table,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  Paper,
  TablePagination,
  IconButton,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { isAuthenticated } from "../apicall";
import Base from "../core/Base";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllSupplier } from "../redux/action/supplier";

const ViewSupplier = ({ getAllSupplier, supplier }) => {
  useEffect(() => {
    getAllSupplier(supplier.rowPerPage, supplier.page);
  }, []);
  return (
    <Base title="View Supplier">
      <TableContainer component={Paper} style={{ maxWidth: "90vw" }}>
        <Table>
          <TableHead stickyHeader>
            <TableRow>
              <TableCell style={{ minWidth: 170 }}>Supplier Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Short Name</TableCell>
              <TableCell>Total Invoice</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supplier.suppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactNumber}</TableCell>
                <TableCell>{supplier.shortName}</TableCell>
                <TableCell>{supplier.invoice.length}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="view"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   getInvoice(invoice.billNo, setDialog);
                    // }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Edit"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   getInvoice(invoice.billNo, setDialog);
                    // }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   getInvoice(invoice.billNo, setDialog);
                    // }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
