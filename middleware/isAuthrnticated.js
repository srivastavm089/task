import jwt from "jsonwebtoken";
import users from "../model/usersModal.js";
const isAuthenticated = async (req, res, next) => {
  try {
    const { user } = req.body;
  
    const decode = jwt.verify(user, process.env.JWT_SECRET);

    const checkUser = await users.findOne({ _id: decode.id });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "login to acceess this resource",
      });
    }
    (req.user = checkUser), next();
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Unauthorized user access",
    });
  }
};

export default isAuthenticated;
