import {loginUser, registerUser} from '../../db/auth/authQueries.js';

/**
 * Login
 */
const loginController = async (req, res) => {
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
