import express from 'express';
import { authLogin, getRole, getUsername, verifyAuth } from '../controllers/LoginController.js';

const LoginRouter = express.Router();

LoginRouter.post("/", authLogin);
LoginRouter.get("/role", getRole);
LoginRouter.get("/username", getUsername);

export default LoginRouter;