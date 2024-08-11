import { Router } from 'express';

import {
    listarTodosMaterias,
    listarMateriasPorId,
    crearMateria,
    actualizarMateria,
    eliminarMateria,

    
} from '../../controllers/materias/materiasControllers.js';
import verifyToken from '../middleware.js';

const MateriasRouter = Router();

// Proteger estas rutas
MateriasRouter.use(verifyToken);

MateriasRouter.get('/', listarTodosMaterias);
MateriasRouter.get('/:id', listarMateriasPorId);
MateriasRouter.post('/', crearMateria);
MateriasRouter.put('/:id', actualizarMateria);
MateriasRouter.delete('/:id', eliminarMateria);

export default MateriasRouter;