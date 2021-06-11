const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  purchase: [{ type: ObjectId, ref: "Bill" }],
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Customer", customerSchema);
