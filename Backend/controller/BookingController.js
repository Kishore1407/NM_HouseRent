const bookingModel = require("../model/BookingModels");
const userModel = require("../model/userModel");
const propertyModel = require("../model/propertyModel");
const CreateBooking = async (req, res) => {
  try {
    console.log(req.body, "data for booking");
    const {
      user,
      property,
      bookingDate,
      status,
      totalPrice,
      paymentStatus,
      checkInDate,
      checkOutDate,
    } = req.body;
    const userExists = await userModel.findById(user);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User id not exists",
      });
    }
    const propertyExists = await propertyModel.findById(property);
    if (!propertyExists) {
      return res.status(404).json({
        success: false,
        message: "Property id not exists",
      });
    }
    const newBooking = await bookingModel.create({
      user,
      property,
      bookingDate,
      status,
      totalPrice,
      paymentStatus,
      checkInDate,
      checkOutDate,
    });
    res.status(201).json({
      success: true,
      message: "new booking created",
      booking: newBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const fetchBookings = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const fetchBooking = await bookingModel.find({ user: id });
    if (!fetchBooking) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      booking: fetchBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteAllBooking = async (req, res) => {
  try {
    const deleteBookings = await bookingModel.deleteMany();
    return res.status(200).json({
      success: true,
      message: "All Bookings Deleted",
      deleteBookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { CreateBooking, fetchBookings, deleteAllBooking };
