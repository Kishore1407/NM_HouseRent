const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    pinCode: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
const userModel = mongoose.model("user", schema);
module.exports = userModel;
