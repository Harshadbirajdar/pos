const mongoose = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
Supplier.createIndexes();
module.exports = Supplier;
