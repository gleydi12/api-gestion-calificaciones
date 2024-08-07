import config from '../../config.js';

/**
 * Carga la lista de las Horarios
 */
const listarTodosHorariosQuery = () => {

    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM Horarios', (err, filas) => {
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
 * Buscar un Horarios por su ID (llave primaria)
 */
const listarHorariosPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM Horarios WHERE id = ? LIMIT 1', [id], (err, filas) => {
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
 * Guardar Horarios
 */
const crearHorarioQuery = async (Horarios) => {
    const { id_profesor, id_materia} = Horarios;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Horarios (id_profesor, id_materia) VALUES (?, ?)';
        config.query(sql, [id_profesor, id_materia], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Actualizar mHorario por su ID   (Endpoint)
 */
const actualizarHorarioQuery = (id, Horarios) => {
    const { id_profesor, id_materia} = Horarios;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Horarios SET id_profesor=?, id_materia=?, WHERE id = ?';
        config.query(sql, [id_profesor, id_materia [id]], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Eliminar una Horario por su ID
 */
const eliminarHorarioQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Horarios WHERE id = ?';
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
    listarTodosHorariosQuery,
    listarHorariosPorIdQuery,
    crearHorarioQuery,
    actualizarHorarioQuery,
    eliminarHorarioQuery,   
}