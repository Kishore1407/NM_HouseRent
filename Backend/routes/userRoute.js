const express = require("express");
const {
  login,
  signUp,
  GoogleAuthentication,
  updateProfile,
  fetchUser,
  fetchProperty,
} = require("../controller/userController");
// const { findUser } = require("../controller/adminController");
const router = express.Router();
router.route("/login").post(login);
router.route("/signup").post(signUp);
router.route("/googleAuth").post(GoogleAuthentication);
router.route("/updateProfile").put(updateProfile);
router.route("/fetchUser").post(fetchUser);
router.route("/fetchUserProperty").post(fetchProperty);
module.exports = router;
