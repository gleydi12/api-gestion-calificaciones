import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config.js';
import dotenv from 'dotenv';

dotenv.config();

const loginUser = (data) => {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
       const sql = 'SELECT id,nombre,email,password FROM usuarios WHERE email = ? LIMIT 1';

       config.query(sql, [email], async (err, filas) => {
           console.log(filas)
           if (err) {
               console.log(err);
               reject(err);
           } else if (filas.length > 0) {
               const usuario = filas[0];

               // Compare la contraseña
               const passwordCompareResult = bcrypt.compare(password, usuario.password);
               if (!passwordCompareResult) {
                   reject('Email o contraseña incorrectos');
               }
               const token = await jwt.sign({
                   id: usuario.id,
                   email: usuario.email,
                   nombre: usuario.nombre
               }, process.env.SECRET_TOKEN);
               resolve(token);  
           } else {
               reject('Usuario no encontrado');
           }
       });
    });
}

/**
 * Create a new user, verify if the email is already in use
 * @param data
 */
const registerUser = (data) => {
    const { name, email, password } = data;
    return new Promise((resolve, reject) => {
        const sql = 'SELECT email FROM usuarios WHERE email = ? LIMIT 1';

        config.query(sql, [email], async (err, filas) => {
            if (err) {
                console.log(err);
                reject(err);
            } else if (filas.length > 0) {
                reject('El email ya está en uso');
            } else {
                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);
                const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';

                config.query(sql, [name, email, hashedPassword], (err, filas) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        // Generate token and return it login the user
                        const token = jwt.sign({
                            id: filas.insertId,
                            email,
                            name
                        }, process.env.SECRET_TOKEN);

                        resolve(token);
                    }
                });
            }
        });
    });
}

export {
    loginUser,
    registerUser
}
