import express from 'express';
import { authLogin, getID, getRole, getUsername, verifyAuth } from '../controllers/LoginController.js';

const LoginRouter = express.Router();

LoginRouter.post("/", authLogin);
LoginRouter.get("/role", getRole);
LoginRouter.get("/username", getUsername);
LoginRouter.get("/id", getID);

export default LoginRouter;