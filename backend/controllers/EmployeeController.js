import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";

export const viewEmployee = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        return res.status(200).json({success: true, message:"Success to Fetch All Employee Data", data:employees});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `${error}`  });
    }
}

export const addEmployee = async (req, res) => {
    try {
        const {fullName, email, telephone, username, password, role, address, profileImg} = req.body;
        
        const checkEmail  = await Employee.findOne({where:{
            email: email,
        }});

        const checkUsername  = await Employee.findOne({where:{
            username: username,
        }});

        if(checkEmail){
            return res.status(400).json({success: false, message: "Email is already used"});
        }

        if(checkUsername){
            return res.status(400).json({success: false, message: "Username is already used"});
        }

        if(password.length > 50){
            return res.status(400).json({success: false, message: "The password must be a maximum of 50 characters"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Employee.create({
            fullName,
            email,
            telephone,
            username,
            password: hashedPassword,
            role,
            address,
            profileImg
        });

        return res.status(200).json({success: true, message: "An Employee Account Successfully created"})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `${error}` });
    }
}

export const editEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, telephone, username, password, role, address, profileImg } = req.body;

        const prevEmployee = await Employee.findOne({
            where:{
                employeeID: id
            }
        });

        const checkEmail  = await Employee.findOne({where:{
            email: email,
        }});

        const checkUsername  = await Employee.findOne({where:{
            username: username,
        }});

        if(checkEmail && prevEmployee.email != email){
            return res.status(400).json({success: false, message: "Email is already used"});
        }

        if(checkUsername && prevEmployee.username != username){
            return res.status(400).json({success: false, message: "Username is already used"});
        }

        if(password.length > 50 && password.length != 60){
            return res.status(400).json({success: false, message: "The password must be a maximum of 50 characters"});
        }

        let hashedPassword;

        if(password.length <= 50){
            hashedPassword = await bcrypt.hash(password, 10);
        }else if(password.length == 60){
            hashedPassword = password;
        }

        await Employee.update({
            fullName: fullName,
            email: email,
            telephone: telephone,
            username: username,
            password: hashedPassword,
            role: role,
            address: address,
            profileImg: profileImg,
        },{
            where:{
                employeeID: id,
            }
        });

        return res.status(200).json({success: true, message: `An Employee Account with ID : ${id} Successfully edited`});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `${error}` });
    }
}

export const destroyEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        await Employee.destroy({
            where: {
                employeeID: id
            }
        });

        return res.status(200).json({success: true, message: `An Employee Account with ID : ${id} Successfully deleted`});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `${error}` });
    }
}

export const filterEmployee = async (req, res) => {
    try {
        const search = req.query.search || "";
        const sortby = req.query.sortby || "fullName";
        const order = req.query.order || "ASC";

        const filteredEmployees = await Employee.findAll({
            where: {
                [Op.or]: [
                    { fullName: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { telephone: { [Op.like]: `%${search}%` } },
                    { username: { [Op.like]: `%${search}%` } },
                    { role: { [Op.like]: `%${search}%` } },
                    { address: { [Op.like]: `%${search}%` } },
                ]
            },
            order: [
                [`${sortby}`, `${order}`]
            ],
        });

        return res.status(200).json({ success: true, message: "Successfully Filtered/Search Employee", data: filteredEmployees });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `${error}` });    
    }
};