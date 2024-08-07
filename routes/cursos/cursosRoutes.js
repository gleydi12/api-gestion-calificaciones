import { Router } from 'express';

import {
    listarTodosCursos,
    listarCursosPorId,
    crearCurso,
    actualizarCurso,
    eliminarCurso,
} from '../../controllers/cursos/cursosController.js';

const cursosRouter = Router();

cursosRouter.get('/', listarTodosCursos);
cursosRouter.get('/:id', listarCursosPorId);
cursosRouter.post('/', crearCurso);
cursosRouter.put('/:id', actualizarCurso);
cursosRouter.delete('/:id', eliminarCurso);

export default cursosRouter;