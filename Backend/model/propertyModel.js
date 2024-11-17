const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    bedRoom: {
      type: Number,
    },
    bathRoom: {
      type: Number,
    },
    area: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    isAvailable: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    furnished: {
      type: Boolean,
    },
    propertyType: {
      type: String,
      enum: ["Apartment", "House", "Studio", "Villa", "Other"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const propertyModel = mongoose.model("property", propertySchema);
module.exports = propertyModel;
