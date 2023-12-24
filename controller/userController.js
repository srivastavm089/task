import User from "../model/usersModal.js";
import cloudinary from "cloudinary";
import ImageUser from "../model/imageModal.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const checkUser = await User.findOne({ email, password });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: `user is already exist with id ${email}`,
      });
    }

    const user = await User.create({
      email,
      password,
      confirmPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      success: true,
      message: "user registered successfully",
      token,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email, password });

    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: `wrong email or passowrd`,
      });
    }
    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET);
    res.status(201).json({
      success: true,
      message: "login successfully",
      token,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const userDetail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const usersList = async (req, res) => {
  try {
    const base = User.find();
    const count = await base.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(501).json({
      success: true,
      message: "internal server error",
    });
  }
};
export const userAddImage = async (req, res) => {
  try {
    console.log("workng");
    const { access, email, avatar } = req.body;
    const findUserMail = await User.findOne({ email });
    if (!findUserMail) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: access,
      resource_type: "image",
    });

    const updateImage = await ImageUser.create({
      public_id: myCloud.public_id,
      url: myCloud.url,
      user: findUserMail._id,
      access,
    });

    res.status(201).json({
      success: true,
      message: "image added succfully ",
    });
  } catch (error) {
    res.status(501).json({
      success: true,
      message: "internal server error",
    });
  }
};


export const finalReset = async (req, res) => {
  try {
    const { password, confirmPassword, email } = req.body;
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "password not same",
      });
    }
    const check = await User.find({ email });
    if (!check) {
      return res.status(401).json({
        success: false,
        password: "enter correct mail id ",
      });
    }
    await User.updateOne({ email }, { password });
    res.status(201).json({
      success: true,
      message: "password reset successfully ",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "internal server error",
    });
  }
};
