const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const supplierInvoiceSchema = {
  supplier: {
    type: ObjectId,
    ref: "Supplier",
  },
  billNo: {
    type: String,
  },
  billAmount: {
    type: Number,
  },
  billDate: {
    type: Date,
  },
  product: [{ type: ObjectId, ref: "Product" }],
  sgst: {
    type: Number,
  },
  cgst: {
    type: Number,
  },
  igst: {
    type: Number,
  },
  transportName: {
    type: String,
  },
  transportPrice: {
    type: Number,
  },
  lrNo: {
    type: String,
  },
  transportDate: {
    type: Date,
  },
  createAt: {
    type: Date,
    default: new Date().toISOString(),
  },
};

module.exports = mongoose.model("SupplierInvoice", supplierInvoiceSchema);
