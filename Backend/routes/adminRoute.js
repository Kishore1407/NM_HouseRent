const express = require("express");
const {
  getAllUsers,
  findUser,
  deleteUser,
  deleteAllUser,
  deleteAllProperty,
  fetchAllBookings,
} = require("../controller/adminController");

const {
  authentication,
  adminAuthorization,
} = require("../Middleware/authMiddleware");
const router = express.Router();
router.route("/getAllUsers").get(
  // authentication, adminAuthorization,
  getAllUsers
);
router.route("/getUser").post(authentication, adminAuthorization, findUser);
router
  .route("/deleteUser")
  .delete(authentication, adminAuthorization, deleteUser);
router
  .route("/deleteAllUser")
  .delete(authentication, adminAuthorization, deleteAllUser);
router.route("/deleteAllProperty").delete(deleteAllProperty);
router.route("/fetchBookings").get(fetchAllBookings);

module.exports = router;
