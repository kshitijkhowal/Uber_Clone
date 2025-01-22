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