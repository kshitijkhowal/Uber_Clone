import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";

export const authUser = async (req, res, next) =>{
    //chack token in either cookiess or headers
    const authHeader = req.headers.authorization;
    const token=req.cookies.token || (authHeader && authHeader.split(" ")[1]);

    //if no token is there then it is unauthorized
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    //check if token is blacklisted
    const isBlacklisted=await blacklistTokenModel.exists({token:token});

    //if token is blacklisted then it is unauthorized
    if(isBlacklisted){
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        const userId=decoded._id;
        const user=await userModel.findById(userId);

        req.user=user;

        return next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }


}  

export const authCaptain = async (req, res, next) =>{
    //chack token in either cookiess or headers
    const authHeader = req.headers.authorization;
    const token=req.cookies.token || (authHeader && authHeader.split(" ")[1]);
    
    //if no token is there then it is unauthorized
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    
    //check if token is blacklisted
    const isBlacklisted=await blacklistTokenModel.exists({token:token});
    
    //if token is blacklisted then it is unauthorized
    if(isBlacklisted){
        return res.status(401).json({message: "Unauthorized"});
    }
    
    //verify token
    try {
        // console.log("hihihihihihihihihihihhi");
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        const captainId=decoded._id;
        const captain=await captainModel.findById(captainId);
        // console.log(captain);

        req.captain=captain;

        return next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }

};