import express from 'express';
import { viewEmployee, addEmployee, editEmployee, destroyEmployee } from '../controllers/EmployeeController.js';

const EmployeeRouter = express.Router();

EmployeeRouter.get("/", viewEmployee);
EmployeeRouter.post("/add", addEmployee);
EmployeeRouter.put("/edit/:id", editEmployee);
EmployeeRouter.delete("/delete/:id", destroyEmployee);

export default EmployeeRouter;