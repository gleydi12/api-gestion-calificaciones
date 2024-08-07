import config from '../../config.js';

/**
 * Carga la lista de los cursos (en este ejemplo solo 3 cursos)
 */
const listarTodosCursosQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM cursos LIMIT 0,3', (err, filas) => {
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
const listarCursosPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM cursos WHERE id = ? LIMIT 1', [id], (err, filas) => {
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
const crearCursoQuery = async (curso) => {
    const { nombre, descripcion } = curso;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO cursos (nombre, descripcion) VALUES (?, ?,)';
        config.query(sql, [nombre, descripcion], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Actualizar un curso por su ID
 */
const actualizarCursoQuery = (id, curso) => {
    const { nombre, descripcion} = curso;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE cursos SET nombre = ?, descripcion = ?,  WHERE id = ?';
        config.query(sql, [nombre,descripcion, id], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Eliminar un curso por su ID
 */
const eliminarCursoQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM cursos WHERE id = ?';
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
    listarTodosCursosQuery,
    listarCursosPorIdQuery,
    crearCursoQuery,
    actualizarCursoQuery,
    eliminarCursoQuery,   
}