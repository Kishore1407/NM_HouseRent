const express = require("express");
const {
  CreateBooking,
  fetchBookings,
  deleteAllBooking,
} = require("../controller/BookingController");
const router = express.Router();
router.post("/createBooking", CreateBooking);
router.get("/fetchBookings/:id", fetchBookings);
router.delete("/deleteAllBookings", deleteAllBooking);
module.exports = router;
