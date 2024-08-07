import config from '../../config.js';

/**
 * Carga la lista de las materias
 */
const listarTodosMateriasQuery = () => {

    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM materias', (err, filas) => {
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
 * Buscar un materias por su ID (llave primaria)
 */
const listarMateriasPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM materias WHERE id = ? LIMIT 1', [id], (err, filas) => {
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
 * Guardar materias
 */
const crearMateriaQuery = async (materias) => {
    const { nombre, id_curso} = materias;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO materias (nombre, id_curso) VALUES (?, ?)';
        config.query(sql, [nombre, id_curso], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Actualizar mmateria por su ID   (Endpoint)
 */
const actualizarMateriaQuery = (id, materias) => {
    const { nombre, id_curso} = materias;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE materias SET nombre=?, id_curso=?, WHERE id = ?';
        config.query(sql, [nombre, id_curso [id]], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Eliminar una materia por su ID
 */
const eliminarMateriaQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM materias WHERE id = ?';
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
    listarTodosMateriasQuery,
    listarMateriasPorIdQuery,
    crearMateriaQuery,
    actualizarMateriaQuery,
    eliminarMateriaQuery,   
}