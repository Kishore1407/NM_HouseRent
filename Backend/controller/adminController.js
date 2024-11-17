const userModel = require("../model/userModel");
const propertyModel = require("../model/propertyModel");
const bookingModel=require("../model/BookingModels")
const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({
      success: true,
      message: "User get success",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const findUser = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const findUser = await userModel.find({ email: email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user found",
      findUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const deleteUser = await userModel.deleteOne({ email: email });
    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user deleted",
      deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteAllUser = async (req, res) => {
  try {
    const deleteAllUser = await userModel.deleteMany();
    if (!deleteAllUser) {
      return res.status(404).json({
        success: false,
        message: "Users not exists to delete",
      });
    }
    return res.json({
      success: true,
      message: "all user delted",
      deleteAllUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteAllProperty = async (req, res) => {
  try {
    const deleteAll = await propertyModel.deleteMany();
    return res.status(200).json({
      success: false,
      message: "Deleted Property",
      deleteAll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const fetchAllBookings=async(req,res)=>
{
  try
  {
    const bookings=await bookingModel.find()
    return res.status(200).json({
      success:true,
      message:"bookings fetch for admin",
      bookings
    })

  }
  catch(error)
  {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

module.exports = {
  getAllUsers,
  deleteAllProperty,
  findUser,
  deleteUser,
  deleteAllUser,
  fetchAllBookings,
};
