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
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Base from "../core/Base";
import { getAllProduct } from "../redux/action/product";
import moment from "moment";
const ViewProduct = ({ fetchProduct, Product }) => {
  useEffect(() => {
    fetchProduct(Product.rowPerPage, Product.page);
  }, []);
  console.log(Product.rowPerPage);
  return (
    <Base title="All Products">
      <TableContainer component={Paper} style={{ maxWidth: "90vw" }}>
        <Table>
          <TableHead stickyHeader>
            <TableRow>
              <TableCell>Barcode</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>HSN</TableCell>
              <TableCell>First Desc</TableCell>
              <TableCell>Second Desc</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>size</TableCell>
              <TableCell>price</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Product.product.length !== 0 &&
              Product.product.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{product.barcode}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>{product.category.hsn}</TableCell>
                    <TableCell>{product.firstLine}</TableCell>
                    <TableCell>{product.thirdLine}</TableCell>
                    <TableCell>{product.cgst + product.sgst}%</TableCell>
                    <TableCell>{product.qty}</TableCell>
                    <TableCell>{product.size}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {moment(product.createAt).format("DD/MM/YYYY")}{" "}
                      {moment(product.createAt).format("hh:mm:A")}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPage={Product.rowPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          count={Product.totalCount}
          page={Product.page}
          onChangeRowsPerPage={(e, rowPerPage) => {
            fetchProduct(rowPerPage.props.value, Product.page);
          }}
          onChangePage={(event, page) => {
            fetchProduct(Product.rowPerPage, page);
          }}
          component="div"
        ></TablePagination>
      </TableContainer>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  Product: state.product.allProduct,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (rowPerPage, page) => {
    dispatch(getAllProduct(rowPerPage, page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
