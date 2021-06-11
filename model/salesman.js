const mongoose = require("mongoose");

const salesmanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  commision: {
    type: Number,
    default: 0,
  },
  phoneNumer: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});
const Salesman = mongoose.model("Salesman", salesmanSchema);
Salesman.createIndexes();
module.exports = Salesman;
