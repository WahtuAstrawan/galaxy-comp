import express from 'express';
import { authLogin, verifyAuth } from '../controllers/LoginController.js';

const LoginRouter = express.Router();

LoginRouter.post("/", authLogin);

export default LoginRouter;