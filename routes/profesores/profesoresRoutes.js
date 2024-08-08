import { Router } from 'express';

import {
    listarTodosProfesores,
    listarProfesoresPorId,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor,
    listarMateriasPorProfesor
} from '../../controllers/profesores/profesoresControllers.js';
import verifyToken from "../middleware.js";

const profesoresRouter = Router();

//proteger las rutas de profesores
profesoresRouter.use(verifyToken);

profesoresRouter.get('/', listarTodosProfesores);
profesoresRouter.get('/:id', listarProfesoresPorId);
profesoresRouter.get('/:id/asignaciones/:year', listarMateriasPorProfesor);
profesoresRouter.get('/:profesor/asignaciones/:asignacion', listarProfesoresPorId);
profesoresRouter.post('/', crearProfesor);
profesoresRouter.put('/:id', actualizarProfesor);
profesoresRouter.delete('/:id', eliminarProfesor);

export default profesoresRouter;
