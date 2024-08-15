import { listarTodosEstudiantesQuery,
    listarEstudianteIdQuery,
    actualizarEstudianteQuery,
    crearEstudianteQuery,
    eliminarEstudianteQuery
 } from '../../db/estudiantes/estudiantesQueries.js'

const listarTodosEstudiantes = async (req, res) => {
  try {
    //  Ejecutar la consulta en la base de datos
    const estudiantes = await listarTodosEstudiantesQuery(req);
    res.json(estudiantes);
  } catch (error) {
    res.status(500).send(error);
  }
};

const listarEstudiantePorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const estudiantes = await listarEstudianteIdQuery(req.params.id);
      res.json(estudiantes);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un estudiante
   */
  const crearEstudiante = async (req, res) => {
    try {
        const datosEstudiante = req.body;
        const resultado = await crearEstudianteQuery(datosEstudiante);
        res.json({ mensaje: 'Estudiante creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un estudiante
   */
  const actualizarEstudiante = async (req, res) => {
    try {
        const id = req.params.id;
        const datosEstudiante = req.body;
        const resultado = await actualizarEstudianteQuery(id, datosEstudiante);
        if (resultado.affectedRows > 0) {
            res.json({status: res.statusCode, mensaje: 'Estudiante actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).send({
            ...error,
            mensaje: error.sqlMessage
        });
    }
  };
  
  /**
   * Eliminar un estudiante
   */
  const eliminarEstudiante = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarEstudianteQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'Estudiante eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el estudiante', error: error.message });
    }
  };

export {
    listarTodosEstudiantes,
    listarEstudiantePorId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
}
