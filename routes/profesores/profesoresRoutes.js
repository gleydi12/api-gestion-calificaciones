import { Router } from 'express';

import {
    listarTodosProfesores,
    listarProfesoresPorId,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor,
    listarMateriasPorProfesor
} from '../../controllers/profesores/profesoresControllers.js';

const profesoresRouter = Router();

profesoresRouter.get('/', listarTodosProfesores);
profesoresRouter.get('/:id', listarProfesoresPorId);
profesoresRouter.get('/:id/asignaciones/:year', listarMateriasPorProfesor);
profesoresRouter.get('/:profesor/asignaciones/:asignacion', listarProfesoresPorId);
profesoresRouter.post('/', crearProfesor);
profesoresRouter.put('/:id', actualizarProfesor);
profesoresRouter.delete('/:id', eliminarProfesor);

export default profesoresRouter;