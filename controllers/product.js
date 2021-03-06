const { validationResult } = require("express-validator");
const SupplierInvoice = require("../model/supplierInvoice");
const Product = require("../model/product");
const Supplier = require("../model/supplier");

// purchase entry add prodcut

exports.purchaseEntry = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  const { product, supplier } = req.body;

  Product.insertMany(product, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }

    let supplierInvoice = new SupplierInvoice({
      ...req.body,
      product: products,
    });
    supplierInvoice.save((err, invoice) => {
      Supplier.findByIdAndUpdate(
        supplier._id,
        { $push: { invoice } },
        (err, suplier) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong",
            });
          }
          return res.json(products);
        }
      );
    });
  });
};

// get product by barcode

exports.getProductByBarcode = (req, res) => {
  let queryBarcode = req.query.barcode;

  let barcode = queryBarcode.split("/")[0];

  Product.findOne({ barcode })
    .populate("category")
    .exec((err, prodcut) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: err,
        });
      }
      if (!prodcut) {
        return res.status(403).json({
          error: "Product Not Found in Database",
        });
      }

      return res.json(prodcut);
    });
};

// get All product with pageination

exports.getAllproduct = async (req, res) => {
  let limit = parseInt(req.query.rowPerPage) || 10;
  let page = parseInt(req.query.page) || 0;

  const startIndex = limit * page;
  const totalCount = await Product.find().countDocuments();

  Product.find()
    .limit(limit)
    .populate("category")
    .skip(startIndex)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      return res.json({ totalCount, product });
    });
};
