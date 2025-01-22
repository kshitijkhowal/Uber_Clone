import express from "express";
import { body } from "express-validator";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({min:3}).withMessage("First name must be at least 3 characters"),
    body("password").isLength({min:5}).withMessage("Password must be at least 5 characters"),
],
registerUser
);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:5}).withMessage("Password must be at least 5 characters"),
],
loginUser
);

router.get("/profile",authUser,getUserProfile);

router.get("/logout",authUser,logoutUser);



export default router;