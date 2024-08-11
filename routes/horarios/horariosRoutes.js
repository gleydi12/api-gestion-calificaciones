import { Router } from 'express';

import {
    listarTodosHorarios,
    listarHorariosPorId,
    crearHorario,
    actualizarHorario,
    eliminarHorario,

    
} from '../../controllers/horarios/horariosControllers.js';
import verifyToken from '../middleware.js';

const HorariosRouter = Router();

// Proteger estas rutas
HorariosRouter.use(verifyToken);

HorariosRouter.get('/', listarTodosHorarios);
HorariosRouter.get('/:id', listarHorariosPorId);
HorariosRouter.post('/', crearHorario);
HorariosRouter.put('/:id', actualizarHorario);
HorariosRouter.delete('/:id', eliminarHorario);

export default HorariosRouter;