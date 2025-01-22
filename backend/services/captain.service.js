import captainModel from "../models/captain.model.js";

export const createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    //check if all fields are present
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error("All fields are required");
    }
    //create captain
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
};