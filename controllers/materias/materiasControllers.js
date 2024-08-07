import { listarTodosMateriasQuery,
    listarMateriasPorIdQuery,
    actualizarMateriaQuery,
    crearMateriaQuery,
    eliminarMateriaQuery
 } from '../../db/materias/materiasQueries.js'

const listarTodosMaterias= async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
  // Try -> intentar
  // Catch -> capturar el error
  try {
    //  Ejecutar la consulta en la base de datos
    const Materias = await listarTodosMateriasQuery();
    res.json(Materias);
  } catch (error) {
    res.status(500).send(error);
  }
};

const listarMateriasPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const Materias = await listarMateriasPorIdQuery(req.params.id);
      res.json(Materias);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear una Materia
   */
  const crearMateria = async (req, res) => {
    console.log(req.body)
    try {
        const datosMateria = req.body;
        const resultado = await crearMateriaQuery(datosMateria);
        res.json({ mensaje: 'materia creada con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de una Materia
   */
  const actualizarMateria = async (req, res) => {
    try {
        const id = req.params.id;
        const datosMateria = req.body;
        const resultado = await actualizarMateriaQuery(id, datosMateria);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'Materia actualizada con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'Materia no encontrada' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar Materia
   */
  const eliminarMateria = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarMateriaQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'materia eliminada con éxito' });
        } else {
            res.status(404).json({ mensaje: 'materia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la materia', error: error.message });
    }
  };

export {
    listarTodosMaterias,
    listarMateriasPorId,
    crearMateria,
    actualizarMateria,
    eliminarMateria,
}