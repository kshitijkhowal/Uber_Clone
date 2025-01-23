import blacklistTokenModel from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res, next) => {
    //validate request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    //fetch data
    const {fullname,email,password,vehicle} = req.body;

    //if captain already exists
    const captainExists = await captainModel.findOne({email});

    if(captainExists){
        return res.status(400).json({error:"Captain already exists"});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    //create captain
    const captain= await createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    //generate token
    const token = captain.generateAuthToken();

    //send response
    res.status(201).json({captain,token});

    

};

export const loginCaptain = async (req, res, next) => {
    //validate request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;
    
    const captain = await captainModel.findOne({email:email}).select("+password");
    //if captain does not exist
    if(!captain){
        return res.status(400).json({error:"Invalid credentials"});
    }
    //if the password is incorrect
    const isMatch = await captain.matchPassword(password);
    if(!isMatch){
        return res.status(400).json({error:"Invalid credentials"});
    }

    //generate token
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token,captain});
};

export const getCaptainProfile = async (req, res, next) => {
    const captain = req.captain;
    res.status(200).json({captain});
};

export const logoutCaptain = async (req, res, next) => {
    //get token from cookies or headers
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    //blacklist token
    await blacklistTokenModel.create({token});
    
    //clear cookie
    res.clearCookie('token');

    res.status(200).json({message: "Logged out successfully"});

};