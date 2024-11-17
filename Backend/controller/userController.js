const userModel = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const propertyModel = require("../model/propertyModel");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "user not exists",
      });
    }
    const validPassword = await bcryptjs.compare(password, userExists.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    const { password: pass, ...rest } = userExists._doc;
    if (email === "vellaikarthick24@gmail.com") {
      userExists.isAdmin = true;
      await userExists.save();
    }

    const jwtToken = jwt.sign(
      { id: userExists._id, isAdmin: userExists.isAdmin },
      process.env.JWT_SECRET
    );
    return res.cookie("token", jwtToken, { httpOnly: true }).status(200).json({
      success: true,
      message: "login success",
      user: rest,
      // isAdmin: userExists.isAdmin,
      token: jwtToken,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "signup");
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await userModel.create({ email, password: hashedPassword });
    const { password: pass, ...rest } = newUser._doc;
    return res.status(201).json({
      success: true,
      message: "Register Success",
      user: rest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GoogleAuthentication = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email, "Email from Gauth");
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      const jwtToken = await jwt.sign(
        { id: existUser._id },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = existUser._doc;
      if (email == "vellaikarthick24@gmail.com") {
        existUser.isAdmin = true;
        await existUser.save();
      }
      return res
        .cookie("token", jwtToken, { httpOnly: true })
        .status(200)
        .json({
          success: true,
          message: "Goolge Auth Success",
          token: jwtToken,
          user: rest,
          // isAdmin: existUser.isAdmin,
        });
    } else {
      const password =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = await bcryptjs.hash(password, 10);
      const newUser = await userModel.create({
        email: req.body.email,
        password: hashPassword,
        // profile
      });
      const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      if (email == "vellaikarthick24@gmail.com") {
        newUser.isAdmin = true;
        await existUser.save();
      }
      return res.cookie("token", token).status(201).json({
        success: true,
        message: "Google Auth success for new User",
        user: rest,
        token: token,
        isAdmin: existUser.isAdmin,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { email } = req.body;
    // const userExists = await userModel.findOne({ email });
    // if (!userExists) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found",
    //   });
    // }
    console.log(req.body);
    const updateUser = await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          userName: req.body.userName,
          address: req.body.address,
          pinCode: req.body.pinCode,
          mobileNo: req.body.mobileNo,
          country: req.body.country,
          address: req.body.address,
          state: req.body.state,
        },
      },
      {
        new: true,
      }
    );
    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "profile updated",
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchUser = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: "user fetch success",
      user: findUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchProperty = async (req, res) => {
  try {
    const { email } = req.body;
    const fetchProperty = await propertyModel.find({ email: email });
    return res.status(200).json({
      success: true,
      message: "property fetch by email",
      property: fetchProperty,
    });
  } catch (error) {
    return res.status(500).json({
      succcess: false,
      message: error.message,
    });
  }
};
module.exports = {
  signUp,
  login,
  GoogleAuthentication,
  updateProfile,
  fetchUser,
  fetchProperty,
};
