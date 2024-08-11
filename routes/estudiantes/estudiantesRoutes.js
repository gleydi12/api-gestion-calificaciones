import { Router } from 'express';

import {
    listarTodosEstudiantes,
    listarEstudiantePorId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
} 
from '../../controllers/estudiantes/estudiantesController.js';
import verifyToken from '../middleware.js';

const estudiantesRouter = Router();

//proteger las rutas de estudiantes
estudiantesRouter.use(verifyToken);

estudiantesRouter.get('/', listarTodosEstudiantes);
estudiantesRouter.get('/:id', listarEstudiantePorId);
estudiantesRouter.post('/', crearEstudiante);
estudiantesRouter.put('/:id', actualizarEstudiante);
estudiantesRouter.delete('/:id', eliminarEstudiante);

export default estudiantesRouter;