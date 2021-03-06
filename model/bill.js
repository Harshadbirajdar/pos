const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Counter = require("./counter");

const billSchema = new mongoose.Schema({
  customer: {
    type: ObjectId,
    ref: "Customer",
  },
  billNo: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
  },

  product: [
    {
      _id: {
        type: ObjectId,
        ref: "Prodcut",
      },
      hsn: {
        type: Number,
      },
      qty: {
        type: Number,
      },
      price: {
        type: Number,
      },
      commission: {
        type: Number,
      },
      barcode: {
        type: String,
      },
      isReturn: {
        type: Boolean,
        default: false,
      },
      amount: {
        type: Number,
      },
      name: {
        type: String,
      },
      gst: {
        type: Number,
      },
      salesman: {
        type: Number,
      },
      isQtyOne: {
        type: Boolean,
        default: false,
      },
    },
  ],
  exchange: {
    type: ObjectId,
    ref: "Exchange",
  },
  location: {
    type: ObjectId,
    ref: "Location",
  },
  createdAt: {
    type: Date,
  },
});
billSchema.pre("save", function (next) {
  var doc = this;

  Counter.findByIdAndUpdate(
    { _id: "billNo" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  ).exec((err, data) => {
    doc.billNo = doc.billNo + data.seq;
    doc.createdAt = new Date();
    doc.populate("customer").execPopulate();
    doc.populate("exchange").execPopulate();
    next();
  });
});

module.exports = mongoose.model("Bill", billSchema);
