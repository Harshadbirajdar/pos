const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Counter = require("./counter");

const exchangeSchema = new mongoose.Schema({
  bill: {
    type: ObjectId,
    ref: "Bill",
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
        type: Number,
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
  isUsed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
  },
});

exchangeSchema.pre("save", function (next) {
  var doc = this;

  Counter.findByIdAndUpdate(
    { _id: "exchangeNo" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  ).exec((err, data) => {
    doc.billNo = doc.billNo + data.seq;
    doc.createdAt = new Date();

    next();
  });
});

module.exports = mongoose.model("Exchange", exchangeSchema);
