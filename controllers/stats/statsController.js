import { getStatsHomePageQuery } from '../../db/stats/statsQueries.js'

const getStatsHomePage = async (req, res) => {
  try {
    //  Ejecutar la consulta en la base de datos
    const calificaciones = await getStatsHomePageQuery();
    res.json(calificaciones);
  } catch (error) {
    res.status(500).send(error);
  }
};


export {
    getStatsHomePage,
}
