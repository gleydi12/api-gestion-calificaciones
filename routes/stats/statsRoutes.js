import { Router } from 'express';

import { getStatsHomePage} from '../../controllers/stats/statsController.js';
import verifyToken from "../middleware.js";

const statsRouter = Router();

//proteger las rutas de las estadísticas
statsRouter.use(verifyToken);

statsRouter.get('/', getStatsHomePage);

export default statsRouter;
