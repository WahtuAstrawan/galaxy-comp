import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import { env } from "../config/var-env.js";

export const authLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const employee = await Employee.findOne({where: {
            username: username
        }});

        const validPass = await bcrypt.compare(password, employee.password);
        
        if(employee && validPass){
            const jwtToken = jwt.sign({
                username: employee.username,
                role: employee.role
            }, env.JWT_SECRET, {expiresIn: '5h'});

            return res.status(200).json({success: true, message: `Hello ${username}, Login Successfully`, token: jwtToken});
        }else{
            return res.status(400).json({success: false, message: "Your username or password is incorrect"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: `${error}`});
    }
}

export const authLogout = async (req, res) => {
    try {
        return res.status(200).json({success: true, message: "Goodbye, Logout Successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: `${error}`});
    }
}

export const verifyAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(token){
            jwt.verify(token, env.JWT_SECRET, (err, user) => {
                if(err){
                    return res.status(400).json({success: false, message: "Token is not valid!"});
                }

                req.user = user;
                next();
            });
        }else{
            return res.status(400).json({success: false, message: "Warning, you are not authenticated!"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: `${error}`});
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(400).json({success: false, message: "Warning, only admin role can access this!"});
        }
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: `${error}`});
    }
}