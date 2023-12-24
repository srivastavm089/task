import express from "express";
import { finalReset, loginUser, registerUser, userAddImage, userDetail, usersList } from "../controller/userController.js";
import { getImage, uploadImage } from "../controller/imagesController.js";
import isAuthenticated from "../middleware/isAuthrnticated.js";
import getMethodAuth from "../middleware/getMethodAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
const router = express.Router();
router.route("/register").post(registerUser)
router.route("/loginUser").post(loginUser);
router.route("/uplaod").post(isAuthenticated , uploadImage);
router.route("/getImage/:id").get(getMethodAuth, getImage);
router.route("/me/:id").get(getMethodAuth , userDetail);
router.route("/admin/userList/:id").get(isAdmin , usersList)
router.route("/admin/userAdd/images/:id").post(isAdmin, userAddImage)


router.route("/finalReset").post(finalReset)






export default router