import express from 'express';
import {body} from 'express-validator';
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captain.controller.js';
import { authCaptain } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('Name must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({min:5}).withMessage('Password must be atleast 5 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),
],
    registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({min:5}).withMessage('Password must be atleast 5 characters long'),
],
    loginCaptain
)

router.get('/captain',authCaptain,getCaptainProfile);

router.get('/logout',authCaptain,logoutCaptain)



export default router;