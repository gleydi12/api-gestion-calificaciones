import config from '../../config.js';

/**
 * Carga la lista de los estudiantes (en este ejemplo solo 3 estudiantes)
 */
const listarTodosEstudiantesQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM estudiantes LIMIT 0,3', (err, filas) => {
            // Si genera error, mostramos en la consola que es lo que falla
            if (err) {
                console.log(err);
                reject(err);
            } else {
                // Si no hay error, devolvemos los datos de la tabla 
                resolve(filas);
            }
        });
    });
};

/**
 * Buscar un estudiante por su ID (llave primaria)
 */
const listarEstudianteIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM estudiantes WHERE id = ? LIMIT 1', [id], (err, filas) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(filas);
            }
        });
    });
};

/**
 * Guardar un nuevo estudiante
 */
const crearEstudianteQuery = async (estudiante) => {
    const { nombre, apellido, telefono, email, direccion } = estudiante;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO estudiantes (nombre, apellido, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)';
        config.query(sql, [nombre, apellido, telefono, email, direccion], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Actualizar un estudiante por su ID
 */
const actualizarEstudianteQuery = (id, estudiante) => {
    const { nombre, apellido, telefono, email, direccion} = estudiante;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE estudiantes SET nombre = ?, apellido = ?, telefono = ?, email =?, direccion = ? WHERE id = ?';
        config.query(sql, [nombre, apellido, telefono, email, direccion, id], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Eliminar un estudiante por su ID
 */
const eliminarEstudianteQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM estudiantes WHERE id = ?';
        config.query(sql, [id], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodosEstudiantesQuery,
    listarEstudianteIdQuery,
    crearEstudianteQuery,
    actualizarEstudianteQuery,
    eliminarEstudianteQuery,   
}