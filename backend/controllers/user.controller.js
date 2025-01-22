import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {
    //check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    //extract data from request body
    const { fullname, lastname, email, password } = req.body;

    //check if user already exists
    const userExists = await userModel.findOne({email});
    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }

    //hash the password
    const hashedPassword = await userModel.hashPassword(password);

    //create user
    const user = await createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword
    });

    //generate token
    const token = user.generateAuthToken();

    res.status(201).json({token,user});
     
}

export const loginUser = async (req, res, next) => {
    //check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    //extract data from request body
    const { email, password } = req.body;

    //find user by email
    const user=await userModel.findOne({email}).select("+password");

    //if no user found
    if(!user){
        return res.status(401).json({message: "Invalid credentials"});
    }

    const isMatch = await user.matchPassword(password);

    //if password does not match
    if(!isMatch){
        return res.status(401).json({message: "Invalid credentials"});
    }
    
    //generate token
    const token = user.generateAuthToken();
    //set cookie
    res.cookie("token",token);

    res.status(200).json({token,user});

}

export const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

export const logoutUser = async (req, res, next) => {
    
    //clearing the cookie
    res.clearCookie("token");

    //fetching token
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];

    //adding token in the blacklist collection
    await blacklistTokenModel.create({token});

    res.status(200).json({message: "Logged out successfully"});
}