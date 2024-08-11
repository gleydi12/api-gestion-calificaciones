import { Router } from 'express';

import { getStatsHomePage} from '../../controllers/stats/statsController.js';
import verifyToken from "../middleware.js";

const statsRouter = Router();

//proteger las rutas de las estadísticas
statsRouter.use(verifyToken);

//Se define una ruta GET para el endpoint '/'(la página principal) 
//utilizando la función getStatsHomePage importada anteriormente
// Cuando se realice una solicitud GET a esta URL, se ejecutará la función
statsRouter.get('/', getStatsHomePage);

export default statsRouter;
