const express = require("express");
const {
  createProperty,
  getAllProperty,
  findProperty,
  deleteProperty,
  updateProperty,
  searchProperty,
} = require("../controller/propertyController");
const router = express.Router();
router.route("/createProperty").post(createProperty);
router.route("/fetchAllProperty").get(getAllProperty);
router.route("/findPropertyById/:id").get(findProperty);
router.route("/deletePropertyById/:id").delete(deleteProperty);
router.route("/updatePropertyById/:id").put(updateProperty);
router.route("/searchProperty").get(searchProperty);
module.exports = router;
