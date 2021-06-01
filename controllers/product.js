const { validationResult } = require("express-validator");
const SupplierInvoice = require("../model/supplierInvoice");
const Product = require("../model/product");

// purchase entry add prodcut

exports.purchaseEntry = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  const { billNo, supplier, billAmount, product } = req.body;

  Product.insertMany(product, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }

    let supplierInvoice = new SupplierInvoice({
      billNo,
      supplier,
      billAmount,
      product: products,
    });
    supplierInvoice.save((err, invoice) => {
      res.json(products);
    });
  });
};
