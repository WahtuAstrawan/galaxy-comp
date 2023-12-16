import express from 'express';
import { viewEmployee, addEmployee, editEmployee, destroyEmployee, filterEmployee } from '../controllers/EmployeeController.js';
import { isAdmin, verifyAuth } from '../controllers/LoginController.js';

const EmployeeRouter = express.Router();

EmployeeRouter.get("/", verifyAuth, isAdmin, viewEmployee);
EmployeeRouter.get("/filter", verifyAuth, isAdmin, filterEmployee);
EmployeeRouter.post("/add", verifyAuth, isAdmin, addEmployee);
EmployeeRouter.put("/edit/:id", verifyAuth, isAdmin, editEmployee);
EmployeeRouter.delete("/delete/:id", verifyAuth, isAdmin, destroyEmployee);

export default EmployeeRouter;