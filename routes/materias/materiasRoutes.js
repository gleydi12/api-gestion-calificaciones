import { Router } from 'express';

import {
    listarTodosMaterias,
    listarMateriasPorId,
    crearMateria,
    actualizarMateria,
    eliminarMateria,

    
} from '../../controllers/materias/materiasControllers.js';

const MateriasRouter = Router();

MateriasRouter.get('/', listarTodosMaterias);
MateriasRouter.get('/:id', listarMateriasPorId);
MateriasRouter.post('/', crearMateria);
MateriasRouter.put('/:id', actualizarMateria);
MateriasRouter.delete('/:id', eliminarMateria);

export default MateriasRouter;