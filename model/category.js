const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  commision: {
    type: Number,
    default: 0,
  },
  commisionBase: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Category", categorySchema);
