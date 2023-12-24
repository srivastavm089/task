import jwt from "jsonwebtoken";
import User from "../model/usersModal.js"
export const isAdmin = async(req, res, next) => {
    console.log("tos")
  try {
    const { id } = req.params;

    const decode = jwt.verify(id, process.env.JWT_SECRET);
    const check = await User.findOne({_id:decode.id});
    if(check.role==="admin"){
      
    return next()
    }

    res.status(401).json({
        success:false,
        message:"Unauthenticated User"
    })
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "something went wrong",
    });
  }
};
