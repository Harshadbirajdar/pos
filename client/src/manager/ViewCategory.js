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
import Base from "../core/Base";
import { getAllCategory } from "../redux/action/category";

const ViewCategory = ({ getAllCategory, category }) => {
  useEffect(() => {
    getAllCategory(category.rowPerPage, category.page);
  }, []);
  return (
    <Base title="View Category">
      <TableContainer component={Paper} style={{ maxWidth: "90vw" }}>
        <Table>
          <TableHead stickyHeader>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Commission By</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.commision}</TableCell>
                <TableCell>
                  {category.commisionBase == 0 ? "% Percentage" : "= Fixed"}
                </TableCell>
                <TableCell>edit</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPage={category.rowPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          onChangeRowsPerPage={(e, rowPerPage) => {
            getAllCategory(rowPerPage.props.value, category.page);
          }}
          count={category.totalCount}
          page={category.page}
          onChangePage={(event, page) => {
            getAllCategory(category.rowPerPage, page);
          }}
          component="div"
        />
      </TableContainer>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  category: state.category,
});
const mapDispatchToProps = (dispatch) => ({
  getAllCategory: (rowPerPage, page) => {
    dispatch(getAllCategory(rowPerPage, page));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewCategory);
