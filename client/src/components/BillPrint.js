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
  console.log(bill);
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
  const [qty, setQty] = useState(
    bill.product.reduce((t, c) => {
      if (c.isQtyOne) {
        return t + 1;
      } else {
        return t + c.qty;
      }
    }, 0)
  );

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
        <h2 style={{ textAlign: "center" }}>Abc Sons</h2>
      </div>
      <p style={{ margin: 0, textAlign: "center" }}>
        sr no 17 Laxman dhankawade patil nager
      </p>
      <p style={{ margin: 0, textAlign: "center" }}>(Near Ganpati Mandir)</p>
      <p style={{ margin: 0, textAlign: "center" }}>
        Ph No: 020-000000000 / 12345678
      </p>
      {/* <p style={{ margin: 0, textAlign: "center" }}>
        City Post Chowk,Laxmi Road, Pune-2
      </p>
      <p style={{ margin: 0, textAlign: "center" }}>
        (Near Dagduseth Ganpati Mandir)
      </p>
      <p style={{ margin: 0, textAlign: "center" }}>
        Ph No: 020-000000000 / 12345678
      </p> */}
      <p
        style={{
          margin: 0,
          fontWeight: 700,
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
          paddingBottom: "1em",
          textAlign: "center",
        }}
      >
        www.gratustech.com
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
          <TableCell style={{ fontWeight: 700, width: 0 }}>SN</TableCell>
          <TableCell style={{ fontWeight: 700, textAlign: "center" }}>
            Item
            <br />
            Code
          </TableCell>
          <TableCell style={{ fontWeight: 700 }}>Hsn</TableCell>
          <TableCell style={{ fontWeight: 700 }}>Qty</TableCell>
          <TableCell style={{ fontWeight: 700 }}>Rate</TableCell>
          <TableCell style={{ fontWeight: 700 }}>GST</TableCell>
          <TableCell style={{ fontWeight: 700 }}>Amount</TableCell>
        </TableHead>
        <TableBody>
          {Object.keys(bill).length !== 0 &&
            bill.product.map((product, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>{product.salesman}</TableCell>

                  <TableCell
                    style={{ textAlign: "center", paddingLeft: "0.9em" }}
                  >
                    {product.name}
                    <br /> {product.barcode}{" "}
                  </TableCell>
                  <TableCell>{product.hsn}</TableCell>
                  <TableCell>{product.qty}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.gst}%</TableCell>
                  <TableCell>{product.amount}</TableCell>
                </TableRow>
              </>
            ))}
          <TableRow>
            <TableCell style={{ fontSize: "1em" }}>
              Qty :<strong>{qty}</strong>
            </TableCell>
            <TableCell
              style={{ padding: "1em", textAlign: "right", fontSize: "1em" }}
              colSpan={6}
            >
              Total Amount :
              <strong>
                {bill.exchange
                  ? (bill.amount + bill.exchange.amount).toFixed(2)
                  : bill.amount.toFixed(2)}
              </strong>
            </TableCell>
          </TableRow>
          {bill.exchange &&
            bill.exchange.product.map((exproduct) => (
              <>
                <TableRow key={exproduct._id}>
                  <TableCell>{exproduct.salesman}</TableCell>

                  <TableCell
                    style={{ textAlign: "center", paddingLeft: "0.9em" }}
                  >
                    {exproduct.name}
                    <br /> {exproduct.barcode}{" "}
                  </TableCell>
                  <TableCell>{exproduct.hsn}</TableCell>
                  <TableCell>{exproduct.qty}</TableCell>
                  <TableCell>{exproduct.price}</TableCell>
                  <TableCell>{exproduct.gst}%</TableCell>
                  <TableCell>{exproduct.amount}</TableCell>
                </TableRow>
              </>
            ))}

          <TableRow>
            <TableCell
              style={{
                textAlign: "right",
                fontSize: "1.2em",
                paddingRight: "1em",
              }}
              colSpan={7}
            >
              <span style={{ textAlign: "right", fontSize: "0.8em" }}>
                Round Off {(-bill.amount + parseInt(bill.amount)).toFixed(2)}
              </span>
              <br />
              Net Payable: <strong> ??? {parseInt(bill.amount)} /-</strong>
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
