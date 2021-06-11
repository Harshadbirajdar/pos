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
    unique: true,
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
    { upsert: true, new: true }
  ).exec((err, data) => {
    let seq = data.seq - docs.length;
    docs.map((doc) => {
      seq = seq + 1;
      doc.barcode = seq;
    });

    next();
  });

  // console.log(docs);
  // next();
});

const Product = mongoose.model("Product", productSchema);
Product.createIndexes();

module.exports = Product;
