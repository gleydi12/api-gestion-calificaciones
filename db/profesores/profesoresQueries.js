import config from '../../config.js';

/**
 * Carga la lista de los estudiantes (en este ejemplo solo 3 estudiantes)
 */
const listarTodosProfesoresQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM profesores LIMIT 0,3', (err, filas) => {
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
 * Buscar un profesores por su ID (llave primaria)
 */
const listarProfesoresIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM profesores WHERE id = ? LIMIT 1', [id], (err, filas) => {
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
 * Guardar un nuevo profesores
 */
const crearProfesorQuery = async (profesor) => {
    const { nombre, apellido, especialidad, telefono, email } = profesor;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO profesores (nombre, apellido,especialidad, telefono, email) VALUES (?, ?, ?, ?, ?)';
        config.query(sql, [nombre, apellido,especialidad, telefono, email], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Actualizar un profesor por su ID
 */
const actualizarProfesorQuery = (id, profesor) => {
    const { nombre, apellido, especialidad, telefono, email} = profesor;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE profesores SET nombre = ?, apellido = ?, especialidad =?, telefono = ? email =?, WHERE id = ?';
        config.query(sql, [nombre, apellido, especialidad, telefono, email, id], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

/**
 * Eliminar un profesor por su ID
 */
const eliminarProfesorQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM profesores WHERE id = ?';
        config.query(sql, [id], (err, resultado) => {
            if (err) {
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

//listarMateriasPorProfesorQuery
const listarMateriasPorProfesorQuery = (id,year) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM materias WHERE id_curso = ? and nombre=?', [id,year], (err, filas) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(filas);
            }
        });
    });
};
// Exportar todas las funciones definidas en este archivo
export {
    listarTodosProfesoresQuery,
    listarProfesoresIdQuery,
    crearProfesorQuery,
    actualizarProfesorQuery,
    eliminarProfesorQuery,   
    listarMateriasPorProfesorQuery,
}