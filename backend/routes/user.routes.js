import express from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controller.js";


const router=express.Router();

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({min:3}).withMessage("First name must be at least 3 characters"),
    body("password").isLength({min:5}).withMessage("Password must be at least 5 characters"),
],
registerUser
);



export default router;