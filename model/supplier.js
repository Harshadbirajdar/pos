const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    shortName: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    invoice: [{ type: ObjectId, ref: "SupplierInvoice" }],
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
Supplier.createIndexes();
module.exports = Supplier;
