import { listarTodosCursosQuery,
    listarCursosPorIdQuery,
    actualizarCursoQuery,
    crearCursoQuery,
    eliminarCursoQuery
 } from '../../db/cursos/cursosQueries.js'

const listarTodosCursos= async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
  // Try -> intentar
  // Catch -> capturar el error
  try {
    //  Ejecutar la consulta en la base de datos
    const cursos = await listarTodosCursosQuery();
    res.json(cursos);
  } catch (error) {
    res.status(500).send(error);
  }
};

const listarCursosPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const cursos = await listarCursosPorIdQuery(req.params.id);
      res.json(cursos);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un cursos
   */
  const crearCurso = async (req, res) => {
    console.log(req.body)
    try {
        const datosCurso = req.body;
        const resultado = await crearCursoQuery(datosCurso);
        res.json({ mensaje: 'Curso creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un curso
   */
  const actualizarCurso = async (req, res) => {
    try {
        const id = req.params.id;
        const datosCurso = req.body;
        const resultado = await actualizarCursoQuery(id, datosCurso);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'curso actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'curso no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un curso
   */
  const eliminarCurso = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarCursoQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'curso eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'curso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el curso', error: error.message });
    }
  };

export {
    listarTodosCursos,
    listarCursosPorId,
    crearCurso,
    actualizarCurso,
    eliminarCurso,
}