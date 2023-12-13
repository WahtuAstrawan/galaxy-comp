import express from 'express';
import { authLogin, authLogout } from '../controllers/LoginController.js';

const LoginRouter = express.Router();

LoginRouter.post("/", authLogin);
LoginRouter.get("/", authLogout);

export default LoginRouter;