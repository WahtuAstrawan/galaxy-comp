import express from 'express';
import { authLogin, authLogout, verifyAuth } from '../controllers/LoginController.js';

const LoginRouter = express.Router();

LoginRouter.post("/", authLogin);
LoginRouter.get("/", verifyAuth, authLogout);

export default LoginRouter;