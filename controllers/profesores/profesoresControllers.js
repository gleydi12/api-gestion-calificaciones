import { listarTodosProfesoresQuery,
    listarProfesoresIdQuery,
    actualizarProfesorQuery,
    crearProfesorQuery,
    eliminarProfesorQuery,
    listarMateriasPorProfesorQuery
 } from '../../db/profesores/profesoresQueries.js'

const listarTodosProfesores = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
  // Try -> intentar
  // Catch -> capturar el error
  try {
    //  Ejecutar la consulta en la base de datos
    const profesores = await listarTodosProfesoresQuery();
    res.json(profesores);
  } catch (error) {
    res.status(500).send(error);
  }
};

const listarProfesoresPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const profesores = await listarProfesoresIdQuery(req.params.id);
      res.json(profesores);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un profesor
   */
  const crearProfesor = async (req, res) => {
    console.log(req.body)
    try {
        const datosProfesor = req.body;
        const resultado = await crearProfesorQuery(datosProfesor);
        res.json({ mensaje: 'Profesor creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un profesor
   */
  const actualizarProfesor = async (req, res) => {
    try {
        const id = req.params.id;
        const datosProfesor = req.body;
        const resultado = await actualizarProfesorQuery(id, datosProfesor);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'Profesor actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'Profesor no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un profesor
   */
  const eliminarProfesor = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarProfesorQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'Profesor eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'profesor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el Profesor', error: error.message });
    }
  };



  //listarAsignacionesPorProfesor
  const listarMateriasPorProfesor = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const profesores = await listarMateriasPorProfesorQuery(req.params.id,req.params.year);
      res.json(profesores);
    } catch (error) {
      res.status(500).send(error);
    }
  };
export {
    listarTodosProfesores,
    listarProfesoresPorId,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor,
    listarMateriasPorProfesor
}