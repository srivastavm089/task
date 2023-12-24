import cloudinary from "cloudinary";
import imageProduct from "../model/imageModal.js";
import users from "../model/usersModal.js";
export const uploadImage = async (req, res) => {
  try {
    const check = await users.findOne({ _id: req.user.id });

    if (!check) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized user please with valid mail id",
      });
    }
    if (!req.body.image) {
      return res.status(401).json({
        success: false,
        message: "attach image file",
      });
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "D90",
      resource_type: "image",
    });

    await imageProduct.create({
      public_id: myCloud.public_id,
      url: myCloud.url,
      user: req.user.id,
      access: req.body.access,
    });
    res.status(201).json({
      success: true,
      message: "uploaded successfully",
    });
  } catch (error) {
    res.status(501).json({ success: false, message: "Internal server error" });
  }
};
export const getImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const data = await imageProduct.find({ user: _id });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(501).json({ success: false, message: "Internal server error" });
  }
};
