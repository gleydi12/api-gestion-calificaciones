import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config.js';
import dotenv from 'dotenv';

dotenv.config();

const loginUser = (data) => {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
       const sql = 'SELECT id,nombres,email,password,tipo FROM usuarios WHERE email = ? LIMIT 1';

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
                   nombres: usuario.nombres,
                   apellidos: usuario.apellidos,
                   tipo: usuario.tipo //tipo de usuario
               }, process.env.SECRET_TOKEN);
               resolve(token);  
           } else {
               reject('Usuario no encontrado');
           }
       });
    });
}

/**
 * Crear un nuevo usuario, verificar que el email no esté en uso
 * @param data
 */
const registerUser = (data) => {
    const { nombres, apellidos, celular, tipo, direccion, especialidad, email } = data;
    return new Promise((resolve, reject) => {
        const sql = 'SELECT email FROM usuarios WHERE email = ? LIMIT 1';

        config.query(sql, [email], async (err, filas) => {
            if (err) {
                console.log(err);
                reject(err);
            } else if (filas.length > 0) {
                reject('El email ya está en uso');
            } else {
                // Aca se deja la contraseña por defecto
                // Todos los usuarios tendrán la misma contraseña para efectos de prueba
                const hashedPassword = await bcrypt.hash('password', 10);
                const sql = 'INSERT INTO usuarios (nombres, apellidos, celular, tipo, direccion, especialidad, email, password) VALUES (?, ?, ?,?, ?, ?,?,?)';

                config.query(sql, [nombres, apellidos, celular, tipo, direccion, especialidad, email, hashedPassword], (err, filas) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        // Generar el token y devolverlo. Firmar el token con el SECRET_TOKEN
                        const token = jwt.sign({
                            id: filas.insertId,
                            email,
                            tipo: filas.tipo,
                            nombres, apellidos
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
