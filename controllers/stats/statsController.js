import { getStatsHomePageQuery } from '../../db/stats/statsQueries.js'

const getStatsHomePage = async (req, res) => {  //que espera dos argumentos: req(la solicitud ) y res(la respuesta)
  try {                          

    const calificaciones = await getStatsHomePageQuery();// se intenta hacer una consulta ala base de datos 
                                                       //y la funcion espera que devuelva un resultado

    res.json(calificaciones);// los resultados lo envia en respuesta json
  } catch (error) {
    res.status(500).send(error);
  }
};


export {
    getStatsHomePage,
}
