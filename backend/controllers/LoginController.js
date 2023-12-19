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

        if (!employee) {
            return res.status(200).json({
                success: false,
                message: "User not found or incorrect password",
            });
        }

        const validPass = await bcrypt.compare(password, employee.password);
        
        if(validPass){
            const jwtToken = jwt.sign({
                username: employee.username,
                role: employee.role
            }, env.JWT_SECRET, {expiresIn: '5h'});

            return res.status(200).json({success: true, message: `Hello ${username}, Login Successfully`, token: jwtToken});
        }else{
            return res.status(200).json({success: false, message: "Your username or password is incorrect"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: `${error}`});
    }
}

export const verifyAuth = async (req, res, next) => {
    try {
        const token = req.headers.auth;
        if(token){
            jwt.verify(token, env.JWT_SECRET, (err, user) => {
                if(err){
                    return res.status(200).json({success: false, message: "Token is not valid!"});
                }

                req.user = user;
                next();
            });
        }else{
            return res.status(200).json({success: false, message: "Warning, you are not authenticated!"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: `${error}`});
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(200).json({success: false, message: "Warning, only admin role can access this!"});
        }
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: `${error}`});
    }
}

export const getRole = async (req, res) => {
    try {
        const token = req.headers.auth;
        if(token){
            jwt.verify(token, env.JWT_SECRET, (err, user) => {
                if(err){
                    return res.status(200).json({success: false, message: "Token is not valid!"});
                }

                return res.status(200).json({success: true, role: user.role});
            });
        }else{
            return res.status(200).json({success: false, message: "Warning, you are not authenticated!"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: `${error}`});
    }
}