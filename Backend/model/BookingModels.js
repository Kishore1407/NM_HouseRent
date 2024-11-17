const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
      required: true,
    },
    bookingDate: {
      type: Date,
      //   required: true,
    },
    checkInDate: {
      type: Date,
      //   required: true,
    },
    checkOutDate: {
      type: Date,
      //   required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      //   default: "Pending",
    },
    totalPrice: {
      type: String,
      //   required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      //   default: "Pending",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;
