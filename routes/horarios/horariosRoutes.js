import { Router } from 'express';

import {
    listarTodosHorarios,
    listarHorariosPorId,
    crearHorario,
    actualizarHorario,
    eliminarHorario,

    
} from '../../controllers/horarios/horariosControllers.js';

const HorariosRouter = Router();

HorariosRouter.get('/', listarTodosHorarios);
HorariosRouter.get('/:id', listarHorariosPorId);
HorariosRouter.post('/', crearHorario);
HorariosRouter.put('/:id', actualizarHorario);
HorariosRouter.delete('/:id', eliminarHorario);

export default HorariosRouter;