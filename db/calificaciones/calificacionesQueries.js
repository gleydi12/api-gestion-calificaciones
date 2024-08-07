import config from '../../config.js';

/**
 * Carga la lista calificaciones (en este ejemplo solo 3 calificacioness)
 */
const listarTodosCalificacionesQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM calificaciones LIMIT 0,3', (err, filas) => {
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
 * Buscar calificaciones por su ID (llave primaria)
 */
const listarCalificacionesPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM calificaciones WHERE id = ? LIMIT 1', [id], (err, filas) => {
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
 * Guardar una nueva calificacio
 */
const crearCalificacionesQuery = async (calificaciones) => {
    const { id_estudiante, id_asignaciones, nota_final } = calificaciones;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO calificaciones (id_estudiante, id_asignaciones, nota_final) VALUES (?, ?, ?)';
        config.query(sql, [id_estudiante, id_asignaciones, nota_final], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Actualizar calificaciones por su ID
 */
const actualizarCalificacionesQuery = (id, calificaciones) => {
    const { id_estudiante, id_asignaciones, nota_final} = calificaciones;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE calificaciones SET id_estudiante=?, id_asignaciones=?, nota_final= ?, WHERE id = ?';
        config.query(sql, [id_estudiante, id_asignaciones, nota_final [id]], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Eliminar una calificacion por su ID
 */
const eliminarCalificacionesQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM calificaciones WHERE id = ?';
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
    listarTodosCalificacionesQuery,
    listarCalificacionesPorIdQuery,
    crearCalificacionesQuery,
    actualizarCalificacionesQuery,
    eliminarCalificacionesQuery,   
}