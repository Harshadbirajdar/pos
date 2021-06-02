const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Counter = require("./counter");

const productSchema = new mongoose.Schema({
  category: {
    type: ObjectId,
    ref: "Category",
  },
  firstLine: {
    type: String,
  },
  barcode: {
    type: String,
    required: true,
  },
  hsn: {
    type: String,
    // required: true,
  },
  qty: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  cgst: {
    type: Number,
    require: true,
  },
  sgst: {
    type: Number,
    require: true,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  secondLine: {
    type: String,
  },
  thirdLine: {
    type: String,
  },
  createAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

productSchema.pre("insertMany", function (next, docs) {
  Counter.findByIdAndUpdate(
    { _id: "barcode" },
    { $inc: { seq: docs.length } },
    { upsert: true }
  ).exec((err, data) => {
    docs.map((doc) => {
      data.seq = data.seq + 1;
      doc.barcode = data.seq;
    });

    console.log(docs);
    next();
  });

  // console.log(docs);
  // next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
