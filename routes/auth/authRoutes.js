import { Router } from "express";

import{
    loginController, registerController
} from '../../controllers/auth/authController.js';

const authRouter = Router();

authRouter.post ('/login', loginController);//validar a un  usuario
authRouter.post ('/register', registerController);//almacenar información de usuario en una base de datos

export default authRouter;
