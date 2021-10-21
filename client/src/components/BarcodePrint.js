import { Grid } from "@material-ui/core";
import React from "react";
import Barcode from "react-barcode";
import "../css/BarcodePrint.css";
const BarcodePrint = React.forwardRef((props, ref) => {
  const { product } = props;

  const print = () => {
    return product.map((products, index) => {
      //   console.log(products)(<h1>s</h1>);
      let a = Array(parseInt(products.qty)).fill("");
      return a.map((v, i) => (
        <div className="print" style={{ display: "flex" }}>
          <div
            style={{
              width: "38mm",
              height: "38mm",
              // border: "1px solid red",
              background: "#ffffff",
              overflow: "hidden",
              marginLeft: "2mm",
              marginRight: "1.5mm",
              marginTop: "2mm",
              marginBottom: "2mm",
            }}
          >
            <div style={{ display: "flex" }}>
              <h3 style={{ margin: 0, marginLeft: "9px" }}>ABC</h3>
              {products.size && (
                <h4
                  style={{
                    margin: 0,
                    marginLeft: "auto",
                    border: "1px solid",
                    minWidth: "35px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {products.size}
                </h4>
              )}
            </div>
            <h4 style={{ margin: 0, marginTop: -6, marginLeft: "45px" }}>
              Sons
            </h4>
            <p style={{ margin: 0, fontSize: "11px", marginLeft: "12px" }}>
              {products.firstLine}
            </p>
            <p style={{ margin: 0, fontSize: "11px", marginLeft: "12px" }}>
              {products.secondLine.length > 3
                ? products.secondLine
                : products.thirdLine}
            </p>
            <h2 style={{ margin: 0, marginTop: -2, textAlign: "center" }}>
              ₹{products.price}/-
            </h2>
            <div className="test">
              <Barcode
                value={`${products.barcode}/${i + 1}`}
                height="23"
                width="1"
                fontSize="10"
                marginTop="1"
                marginBottom="1"
              />
            </div>
          </div>
          <div
            style={{
              width: "38mm",
              height: "38mm",
              // border: "1px solid red",
              background: "#ffffff",
              overflow: "hidden",
              marginRight: "2mm",
              marginLeft: "1.5mm",
              marginTop: "2mm",
              marginBottom: "2mm",
            }}
          >
            <div style={{ display: "flex" }}>
              <h3 style={{ margin: 0, marginLeft: "9px" }}>ABC</h3>
              {products.size && (
                <h4
                  style={{
                    margin: 0,
                    marginLeft: "auto",
                    border: "1px solid",
                    minWidth: "35px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {products.size}
                </h4>
              )}
            </div>
            <h4 style={{ margin: 0, marginTop: -6, marginLeft: "45px" }}>
              Sons
            </h4>
            <p style={{ margin: 0, fontSize: "11px", marginLeft: "12px" }}>
              {products.firstLine}
            </p>
            <p style={{ margin: 0, fontSize: "11px", marginLeft: "12px" }}>
              {products.secondLine.length > 3
                ? products.secondLine
                : products.thirdLine}
            </p>
            <h2 style={{ margin: 0, marginTop: -2, textAlign: "center" }}>
              ₹{products.price}/-
            </h2>
            <div className="test">
              <Barcode
                value={`${products.barcode}/${i + 1}`}
                height="23"
                width="1"
                fontSize="10"
                marginTop="1"
                marginBottom="1"
              />
            </div>
          </div>
        </div>
      ));
      {
        products.qty % 2 !== 0 && (
          <div
            style={{
              width: "38mm",
              height: "38mm",
              border: "1px solid red",
              background: "#ffffff",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex" }}>
              <h3 style={{ margin: 0, marginLeft: "9px" }}>Moolchand</h3>
              <h4
                style={{
                  margin: 0,
                  marginLeft: "auto",
                  border: "1px solid",
                  minWidth: "35px",
                  textAlign: "center",
                }}
              >
                {" "}
                {products.size}
              </h4>
            </div>
            <h4 style={{ margin: 0, marginTop: -6, marginLeft: "45px" }}>
              Sons
            </h4>
            <p style={{ margin: 0, fontSize: "11px", marginLeft: "12px" }}>
              {products.firstLine}
            </p>
            <p style={{ margin: 0, fontSize: "11px", marginLeft: "12px" }}>
              {products.secondLine.length > 3
                ? products.secondLine
                : products.thirdLine}
            </p>
            <h2 style={{ margin: 0, marginTop: -2, textAlign: "center" }}>
              ₹{products.price}/-
            </h2>
            <div className="test">
              <Barcode
                value={products.barcode}
                height="23"
                width="1"
                fontSize="10"
                marginTop="1"
                marginBottom="1"
              />
            </div>
          </div>
        );
      }
    });
  };
  return <div ref={ref}>{print()}</div>;
});

export default BarcodePrint;

// return (
//   <Grid
//     item
//     style={{
//       width: "38mm",
//       height: "38mm",
//       border: "1px solid red",
//       background: "#ffffff",
//       overflow: "hidden",
//     }}
//   >
//     <div style={{ display: "flex" }}>
//       <h3 style={{ margin: 0, marginLeft: "9px" }}>Moolchand</h3>
//       <h4
//         style={{
//           margin: 0,
//           marginLeft: "auto",
//           border: "1px solid",
//           minWidth: "35px",
//           textAlign: "center",
//         }}
//       >
//         {" "}
//         {product.size}
//       </h4>
//     </div>
//     <h4 style={{ margin: 0, marginTop: -6, marginLeft: "45px" }}>
//       Sons
//     </h4>
//     <p style={{ margin: 0, fontSize: "11px", marginLeft: "12px" }}>
//       {product.firstLine}
//     </p>
//     <p style={{ margin: 0, fontSize: "11px", marginLeft: "12px" }}>
//       {product.secondLine.length > 3
//         ? product.secondLine
//         : product.thirdLine}
//     </p>
//     <h2 style={{ margin: 0, marginTop: -2, textAlign: "center" }}>
//       ₹{product.price}/-
//     </h2>
//     <div className="test">
//       <Barcode
//         value={product.barcode}
//         height="23"
//         width="1"
//         fontSize="10"
//         marginTop="1"
//         marginBottom="1"
//       />
//     </div>
//   </Grid>
// );
