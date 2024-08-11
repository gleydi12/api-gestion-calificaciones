import { createConnection } from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const config = createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

//Validar la conexión a la base de datos
config.connect(function (err) {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa con el id ' + config.threadId);
})


export default config;
