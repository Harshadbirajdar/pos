import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import Barcode from "react-barcode";

import moment from "moment";

const BillPrint = React.forwardRef((props, ref) => {
  const { bill } = props;
  const [gst12, setGst12] = useState(
    bill.product
      .filter(({ gst }) => gst === 12)
      .reduce((t, c) => t + c.amount, 0)
  );
  const [gst5, setGst5] = useState(
    bill.product
      .filter(({ gst }) => gst === 5)
      .reduce((t, c) => t + c.amount, 0)
  );
  const [qty, setQty] = useState(bill.product.reduce((t, c) => t + c.qty, 0));

  const gstTable = (gst, percentage) => {
    let taxableAmount = gst * (100 / (100 + percentage));
    return (
      <TableRow>
        <TableCell>{taxableAmount.toFixed(2)}</TableCell>
        <TableCell>
          {((taxableAmount * percentage) / 200).toFixed(2)}
          <br />({percentage / 2}%)
        </TableCell>
        <TableCell>
          {((taxableAmount * percentage) / 200).toFixed(2)}
          <br />({percentage / 2}%)
        </TableCell>
        <TableCell>{gst}</TableCell>
      </TableRow>
    );
  };
  return (
    <div
      ref={ref}
      style={{
        width: "79mm",
        // border: "1px solid "
      }}
    >
      <div>
        {/* <img
          src="https://www.moolchandsons.com/static/media/logo.7e1b8d1d.png"
          width="50"
        /> */}
        <h2 style={{ textAlign: "center" }}>Moolchand Sons</h2>
      </div>
      <p style={{ margin: 0, textAlign: "center" }}>
        City Post Chowk,Laxmi Road, Pune-2
      </p>
      <p style={{ margin: 0, textAlign: "center" }}>
        (Near Dagduseth Ganpati Mandir)
      </p>
      <p style={{ margin: 0, textAlign: "center" }}>
        Ph No: 020-24432828 / 24461125
      </p>
      <p
        style={{
          margin: 0,
          fontWeight: 700,
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
          paddingBottom: "1em",
          textAlign: "center",
        }}
      >
        www.moolchandsons.com
      </p>
      {bill.customer && (
        <div
          style={{
            // display: "flex",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            paddingLeft: "1em",
          }}
        >
          <p style={{ margin: "0", marginTop: "0.5em" }}>
            Name :{bill.customer.name}
          </p>
          <p style={{ margin: "0", marginBottom: "0.5em" }}>
            {" "}
            Phone Number :{bill.customer.phoneNumber}
          </p>
        </div>
      )}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
          paddingBottom: "1em",
          paddingLeft: "1em",
        }}
      >
        <p>Bill No :{bill.billNo}</p>

        <div style={{ marginLeft: "Auto" }}>
          <p style={{ marginBottom: "0" }}>
            Date : {moment(bill.createdAt).format("DD/MM/YYYY")}
          </p>
          <p style={{ margin: "0" }}>
            Time : {moment(bill.createdAt).format("hh:mm A")}
          </p>
        </div>
      </div>
      <Table className="bill-print">
        <TableHead>
          <TableCell
            style={{ fontWeight: 700, textAlign: "left", paddingLeft: "0.9em" }}
          >
            Item
            <br />
            HSN
          </TableCell>
          <TableCell style={{ fontWeight: 700 }}>Qty</TableCell>
          <TableCell style={{ fontWeight: 700 }}>Rate</TableCell>
          <TableCell style={{ fontWeight: 700 }}>GST</TableCell>
          <TableCell style={{ fontWeight: 700 }}>Amount</TableCell>
        </TableHead>
        <TableBody>
          {Object.keys(bill).length !== 0 &&
            bill.product.map((product, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: "left", paddingLeft: "0.9em" }}>
                  {product.name}
                  <br /> {product.hsn}{" "}
                </TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.gst}%</TableCell>
                <TableCell>{product.amount}</TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell style={{ fontSize: "1.2em" }}>
              Qty :<strong>{qty}</strong>
            </TableCell>
            <TableCell
              style={{ padding: "1em", textAlign: "right", fontSize: "1.2em" }}
              colSpan={4}
            >
              Total Amount :<strong>{bill.amount}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <p>Total Amount :{bill.amount}</p> */}
      {/* <hr /> */}
      <Table className="bill-print">
        <TableHead>
          <TableCell>
            {" "}
            Taxable <br />
            Amount
          </TableCell>
          <TableCell> CGST</TableCell>
          <TableCell> SGST</TableCell>
          <TableCell>
            {" "}
            Total
            <br />
            Amount
          </TableCell>
        </TableHead>
        <TableBody>
          {gst5 !== 0 && gstTable(gst5, 5)}
          {gst12 !== 0 && gstTable(gst12, 12)}
        </TableBody>
      </Table>
      <div style={{ marginTop: "1em" }}>
        <Barcode
          value={bill._id}
          fontSize="10"
          height="25"
          width="1"
          displayValue={false}
          marginTop="1"
          marginBottom="1"
        />
      </div>
    </div>
  );
});

export default BillPrint;
