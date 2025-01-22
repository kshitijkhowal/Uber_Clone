import userModel from "../models/user.model.js";

//create user
export const createUser = async ({
    firstname, lastname, email, password
}) => {
    //check if all fields are present
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }
    //create user
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    return user;
};