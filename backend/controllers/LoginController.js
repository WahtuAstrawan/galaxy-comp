import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";

export const authLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const employee = await Employee.findOne({where: {
            username: username
        }});

        const validPass = await bcrypt.compare(password, employee.password);
        
        if(employee && validPass){
            req.session.isLogin = true;
            req.session.username = username;
            req.session.role = employee.role;
            return res.status(200).json({success: true, message: `Hello ${username}, Login Successfully`});
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
        req.session.destroy();
        return res.status(200).json({success: true, message: "Goodbye, Logout Successfully"});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: `${error}`});
    }
}