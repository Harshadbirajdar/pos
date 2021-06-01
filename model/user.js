const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      unqiue: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: true,
    },
    encryPassword: {
      type: String,
      required: true,
    },
    slat: String,
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.slat = uuidv4();

    this.encryPassword = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  autheticated: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encryPassword;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.slat)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
