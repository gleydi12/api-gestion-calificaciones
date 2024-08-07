import { listarTodosHorariosQuery,
    listarHorariosPorIdQuery,
    actualizarHorarioQuery,
    crearHorarioQuery,
    eliminarHorarioQuery
 } from '../../db/horarios/horariosQueries.js'

const listarTodosHorarios= async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
  // Try -> intentar
  // Catch -> capturar el error
  try {
    //  Ejecutar la consulta en la base de datos
    const Horarios = await listarTodosHorariosQuery();
    res.json(Horarios);
  } catch (error) {
    res.status(500).send(error);
  }
};

const listarHorariosPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const Horarios = await listarHorariosPorIdQuery(req.params.id);
      res.json(Horarios);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear una Horario
   */
  const crearHorario = async (req, res) => {
    console.log(req.body)
    try {
        const datosHorario = req.body;
        const resultado = await crearHorarioQuery(datosHorario);
        res.json({ mensaje: 'Horario creada con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de una Horario
   */
  const actualizarHorario = async (req, res) => {
    try {
        const id = req.params.id;
        const datosHorario = req.body;
        const resultado = await actualizarHorarioQuery(id, datosHorario);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'Horario actualizada con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'Horario no encontrada' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar Horario
   */
  const eliminarHorario = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarHorarioQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'Horario eliminada con éxito' });
        } else {
            res.status(404).json({ mensaje: 'Horario no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la Horario', error: error.message });
    }
  };

export {
    listarTodosHorarios,
    listarHorariosPorId,
    crearHorario,
    actualizarHorario,
    eliminarHorario,
}