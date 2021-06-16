import React, { useEffect } from "react";
import { connect } from "react-redux";
import Base from "../core/Base";
import { getAllSalesman } from "../redux/action/salesman";
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
import moment from "moment";
const ViewSalesman = ({ Salesman, fetchSalesman }) => {
  useEffect(() => {
    fetchSalesman(Salesman.rowPerPage, Salesman.page);
  }, []);
  return (
    <Base title="View Salesman">
      <TableContainer component={Paper} style={{ maxWidth: "90vw" }}>
        <Table>
          <TableHead stickyHeader>
            <TableRow>
              <TableCell style={{ minWidth: 170 }}>Supplier Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Total CS</TableCell>
              <TableCell>Created </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Salesman.salseman.map((salesman) => (
              <TableRow key={salesman._id}>
                <TableCell>{salesman.id}</TableCell>
                <TableCell>{salesman.name}</TableCell>
                <TableCell>
                  {salesman.phoneNumber ? salesman.createdAt : "-"}
                </TableCell>
                <TableCell>{salesman.commision}</TableCell>
                <TableCell>
                  {moment(salesman.createdAt).format("DD/MM/YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPage={Salesman.rowPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          onChangeRowsPerPage={(e, rowPerPage) => {
            fetchSalesman(rowPerPage.props.value, Salesman.page);
          }}
          count={Salesman.totalCount}
          page={Salesman.page}
          onChangePage={(event, page) => {
            fetchSalesman(Salesman.rowPerPage, page);
          }}
          component="div"
        />
      </TableContainer>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  Salesman: state.salesman.viewSalesman,
});
const mapDisptachToProps = (dispatch) => ({
  fetchSalesman: (rowPerPage, page) => {
    dispatch(getAllSalesman(rowPerPage, page));
  },
});
export default connect(mapStateToProps, mapDisptachToProps)(ViewSalesman);
