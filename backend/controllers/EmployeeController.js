import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

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
            return res.status(200).json({success: false, message: "Email is already used"});
        }

        if(checkUsername){
            return res.status(200).json({success: false, message: "Username is already used"});
        }

        if(password.length > 50){
            return res.status(200).json({success: false, message: "The password must be a maximum of 50 characters"});
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
      const {
        fullName,
        email,
        telephone,
        username,
        newPassword,
        role,
        address,
        profileImg,
      } = req.body;
  
      const prevEmployee = await Employee.findOne({
        where: {
          employeeID: id,
        },
      });
  
      const checkEmail = await Employee.findOne({
        where: {
          email: email,
        },
      });
  
      const checkUsername = await Employee.findOne({
        where: {
          username: username,
        },
      });
  
      if (checkEmail && prevEmployee.email !== email) {
        return res.status(200).json({
          success: false,
          message: "Email is already used",
        });
      }
  
      if (checkUsername && prevEmployee.username !== username) {
        return res.status(200).json({
          success: false,
          message: "Username is already used",
        });
      }
  
      let updates = {
        fullName: fullName,
        email: email,
        telephone: telephone,
        username: username,
        role: role,
        address: address,
        profileImg: profileImg,
      };
  
      if (newPassword) {
        if (newPassword.length > 50) {
          return res.status(200).json({
            success: false,
            message: "The password must be a maximum of 50 characters",
          });
        }
  
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updates.password = hashedPassword;
      }
  
      await Employee.update(updates, {
        where: {
          employeeID: id,
        },
      });
  
      return res.status(200).json({
        success: true,
        message: `An Employee Account with ID : ${id} Successfully edited`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: `${error}`,
      });
    }
  };
  

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
        console.log(req.query);

        const search = req.query.search || "";
        const sortby = req.query.sortby || "updatedAt";
        const order = req.query.order || "DESC";
        const role = req.query.role || null;
        const page = parseInt(req.query.page) || 1;

        let filteredEmployees = await Employee.findAll({
            where: {
                [Op.or]: [
                    { fullName: { [Op.iLike]: `%${search}%` } },
                    { email: { [Op.iLike]: `%${search}%` } },
                    { telephone: { [Op.iLike]: `%${search}%` } },
                    { username: { [Op.iLike]: `%${search}%` } },
                    { address: { [Op.iLike]: `%${search}%` } },
                ]
            },
            order: [
                [sortby, order]
            ],
            offset: 10 * (parseInt(page) - 1),
            limit: 10
        });

        if(role){
            filteredEmployees = filteredEmployees.filter(employee => employee.role === role);
        }

        return res.status(200).json({ success: true, message: "Successfully Filtered Employees", data: filteredEmployees });
        
    } catch (error) {
        console.error(error);
        console.log(error);
        return res.status(500).json({ success: false, message: `${error}` });
    }
};