import { Router } from 'express';

import {
    listarTodosCursos,
    listarCursosPorId,
    crearCurso,
    actualizarCurso,
    eliminarCurso,
} from '../../controllers/cursos/cursosController.js';
import verifyToken from '../middleware.js';

const cursosRouter = Router();

// Proteger estas rutas
cursosRouter.use(verifyToken);

cursosRouter.get('/', listarTodosCursos);
cursosRouter.get('/:id', listarCursosPorId);
cursosRouter.post('/', crearCurso);
cursosRouter.put('/:id', actualizarCurso);
cursosRouter.delete('/:id', eliminarCurso);

export default cursosRouter;