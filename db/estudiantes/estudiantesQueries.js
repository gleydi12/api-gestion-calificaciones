import config from '../../config.js';

/**
 * Carga la lista de los estudiantes (en este ejemplo solo 3 estudiantes)
 */
const listarTodosEstudiantesQuery = (req) => {
    // The req has page, per_page, and search query params
    const { page, per_page, search } = req.query;
    // The page number is calculated by multiplying the page number by the number of items per page
    const offset = (page - 1) * per_page;
    // The query is built based on the search query param
    const sql = search ? `
SELECT id, email, nombres, apellidos, celular, direccion, especialidad, tipo 
FROM usuarios 
WHERE tipo = 3 AND (nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR celular LIKE '%${search}%' OR direccion LIKE '%${search}%' OR especialidad LIKE '%${search}%') LIMIT ${per_page} 
OFFSET ${offset}` : `SELECT id, email, nombres, apellidos, celular, direccion, especialidad, tipo  FROM usuarios WHERE tipo = 3 LIMIT ${per_page} OFFSET ${offset}`;

    return new Promise((resolve, reject) => {
        let total = 0
        // Count all the items in the database avoiding the limit and offset and only using the where tipo = 3
        config.query('SELECT COUNT(*) AS total FROM usuarios WHERE tipo = 3', (err, total) => {
            // Guardar el total de items en la base de datos
            total = total[0].total;
            if (err) {
                console.log(err);
                reject(err);
            } else {
                // The total number of items is the total number of items in the database
                config.query(sql, (err, filas) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        const current_page = Number(page);
                        resolve({ total, current_page, data: filas });
                    }
                });
            }
        })
    });
};

/**
 * Buscar un estudiante por su ID (llave primaria)
 */
const listarEstudianteIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT id, email, nombres, apellidos, celular, direccion, especialidad, tipo  FROM usuarios WHERE tipo = 3 AND id = ? LIMIT 1', [id], (err, filas) => {
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
    const { nombres, apellidos, celular, email, direccion, especialidad} = estudiante;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO usuarios (nombres, apellidos, celular, email, direccion,especialidad) VALUES (?, ?, ?, ?, ?)';
        config.query(sql, [nombres, apellidos, celular, email, direccion, especialidad], (err, resultado) => {
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
    const { nombres, apellidos, celular, email, direccion, especialidad} = estudiante;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE usuarios SET nombres = ?, apellidos = ?, celular = ?, email =?, direccion = ?, especialidad = ? WHERE id = ?';
        config.query(sql, [nombres, apellidos, celular, email, direccion, especialidad, id], (err, resultado) => {
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
        const sql = 'DELETE FROM usuarios WHERE id = ?';
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
