const { response } = require("express");
const propertyModel = require("../model/propertyModel");
const createProperty = async (req, res) => {
  try {
    // const {title,description,address,bedRoom,bathRoom,area,parking,furnished,price,images,}
    console.log(req.body, "property data for creating");
    const newProperty = await propertyModel.create(req.body);
    return res.status(201).json({
      success: true,
      message: "new property created",
      property: newProperty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllProperty = async (req, res) => {
  try {
    const property = await propertyModel.find();
    return res.status(200).json({
      success: true,
      message: "Property fetch Success",
      property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const findProperty = async (req, res) => {
  try {
    // const id=req.params.id
    const { id } = req.params;
    const property = await propertyModel.findById(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Property fectch id",
      property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProperty = await propertyModel.findByIdAndDelete(id);
    if (!deleteProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
        deleteProperty,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Property deleted by id",
      deleteProperty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    // const {id}=req.params
    const findProperty = await propertyModel.findById(id);
    if (!findProperty) {
      return res.status(404).json({
        success: false,
        message: "Property id not found for update",
      });
    }
    console.log(id);
    const updateProperty = await propertyModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          address: req.body.address,
          area: req.body.area,
          bathRoom: req.body.bathRoom,
          bedRoom: req.body.bedRoom,
          // images: req.body.images,
          parking: req.body.parking,
          isAvailable: req.body.isAvailable,
          furnished: req.body.furnished,
          propertyType: req.body.propertyType,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Property updated",
      property: updateProperty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const searchProperty = async (req, res) => {
  try {
    console.log(req.query);
    let limit = parseInt(req.query.limit) || 100;
    let startIndex = parseInt(req.query.startIndex) || 0;
    let isAvailable = req.query.isAvailable;
    if (isAvailable === undefined || isAvailable === "false") {
      isAvailable = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const query = {
      $or: [
        { state: { $regex: searchTerm, $options: "i" } },
        { propertyType: { $regex: searchTerm, $options: "i" } },
        { country: { $regex: searchTerm, $options: "i" } },
      ],
    };

    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable;
    }
    if (furnished !== undefined) {
      query.furnished = furnished;
    }
    if (parking !== undefined) {
      query.parking = parking;
    }

    const propertyListing = await propertyModel
      .find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.json({
      success: true,
      message: "Filtered Property Listings",
      propertyListing,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getAllProperty,
  findProperty,
  deleteProperty,
  updateProperty,
  searchProperty,
};
