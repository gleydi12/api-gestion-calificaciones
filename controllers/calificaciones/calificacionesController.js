import { listarTodosCalificacionesQuery,
    listarCalificacionesPorIdQuery,
    actualizarCalificacionesQuery,
    crearCalificacionesQuery,
    eliminarCalificacionesQuery
 } from '../../db/calificaciones/calificacionesQueries.js'

const listarTodosCalificaciones = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
  // Try -> intentar
  // Catch -> capturar el error
  try {
    //  Ejecutar la consulta en la base de datos
    const calificaciones = await listarTodosCalificacionesQuery();
    res.json(calificaciones);
  } catch (error) {
    res.status(500).send(error);
  }
};

const listarCalificacionesPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const calificacioness = await listarCalificacionesPorIdQuery(req.params.id);
      res.json(calificaciones);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un calificaciones
   */
  const crearCalificaciones = async (req, res) => {
    console.log(req.body)
    try {
        const datoscalificaciones = req.body;
        const resultado = await crearCalificacionesQuery(datoscalificaciones);
        res.json({ mensaje: 'calificaciones creadas con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de una calificacion
   */
  const actualizarCalificaciones = async (req, res) => {
    try {
        const id = req.params.id;
        const datoscalificaciones = req.body;
        const resultado = await actualizarCalificacionesQuery(id, datoscalificaciones);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'calificaciones actualizadas con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'calificaciones no encontradas' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar  calificaciones
   */
  const eliminarCalificaciones = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarCalificacionesQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'calificaciones eliminadas con éxito' });
        } else {
            res.status(404).json({ mensaje: 'calificaciones no encontradas' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar calificaciones', error: error.message });
    }
  };

export {
    listarTodosCalificaciones,
    listarCalificacionesPorId,
    crearCalificaciones,
    actualizarCalificaciones,
    eliminarCalificaciones,
}