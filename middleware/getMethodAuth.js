import jwt from "jsonwebtoken";
import users from "../model/usersModal.js";
const getMethodAuth = async (req, res, next) => {
    console.log("woring ")
  try {
    const { id } = req.params;
    const decode = jwt.verify(id, process.env.JWT_SECRET);
    console.log(decode);
    const checkUser = await users.findOne({ _id: decode.id });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized user ",
      });
    }
    req.user = checkUser;
    next();
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "something went wrong",
    });
  }
};
export default getMethodAuth;
