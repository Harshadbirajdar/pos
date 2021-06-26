const mongoose = require("mongoose");

const CategoryBarcodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  barcode: { required: true, unique: true, type: Number },
  commision: {
    type: Number,
    default: 0,
  },
  hsn: {
    type: Number,
    required: true,
  },
  commisionBase: {
    type: Number,
    default: 0,
  },
  gstAmount: {
    type: Number,
  },
  gstGreater: {
    type: Number,
  },
  gstLesser: {
    type: Number,
  },
  isQtyOne: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("CategoryBarcode", CategoryBarcodeSchema);
