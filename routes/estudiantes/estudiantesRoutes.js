import { Router } from 'express';
import verifyToken from '../middleware.js';

import {
    listarTodosEstudiantes,
    listarEstudiantePorId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
} from '../../controllers/estudiantes/estudiantesController.js';

const estudiantesRouter = Router();

//proteger las rutas de estudiantes
estudiantesRouter.use(verifyToken);

estudiantesRouter.get('/', listarTodosEstudiantes);
estudiantesRouter.get('/:id', listarEstudiantePorId);
estudiantesRouter.post('/', crearEstudiante);
estudiantesRouter.put('/:id', actualizarEstudiante);
estudiantesRouter.delete('/:id', eliminarEstudiante);

export default estudiantesRouter;