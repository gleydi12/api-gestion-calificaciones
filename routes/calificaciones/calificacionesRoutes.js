import { Router } from 'express';

import {
    listarTodosCalificaciones,
    listarCalificacionesPorId,
    crearCalificaciones,
    actualizarCalificaciones,
    eliminarCalificaciones,
} from '../../controllers/calificaciones/calificacionesController.js';

const calificacionesRouter = Router();

calificacionesRouter.get('/', listarTodosCalificaciones);
calificacionesRouter.get('/:id', listarCalificacionesPorId);
calificacionesRouter.post('/', crearCalificaciones);
calificacionesRouter.put('/:id', actualizarCalificaciones);
calificacionesRouter.delete('/:id', eliminarCalificaciones);

export default calificacionesRouter;