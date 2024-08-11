import {loginUser, registerUser} from '../../db/auth/authQueries.js';

/**
 * loginControllery registerController  forman parte de un sistema de autenticación estos controladores
 *  interactúan con las consultas de la base de datos para 
 * gestionar los procesos de registro e inicio de sesión de los usuarios.
 * 
 */
const loginController = async (req, res) => {/**tiene un objeto de solicitud(req) y uno de respuesta(res) */
    try {
        const token = await loginUser(req.body);

        res.json({ token });

    } catch (error) {
        res.status(500).send(error);
    }
}


const registerController = async (req, res) => {
    try {
        const token = await registerUser(req.body);

        res.json({ token });

    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    loginController,
    registerController
}
