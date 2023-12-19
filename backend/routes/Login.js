import express from 'express';
import { authLogin, getRole, verifyAuth } from '../controllers/LoginController.js';

const LoginRouter = express.Router();

LoginRouter.post("/", authLogin);
LoginRouter.get("/role", getRole);

export default LoginRouter;