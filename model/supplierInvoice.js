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
  product: [{ type: ObjectId, ref: "Product" }],
};

module.exports = mongoose.model("SupplierInvoice", supplierInvoiceSchema);
