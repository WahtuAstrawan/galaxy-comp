import User from "../models/Users.js";

export const getUsers = async(req, res) => {
    try{
        const response = await User.findAll();
        res.status(200).json(response);
    }catch (err){
        console.log(err.message);
    }
}