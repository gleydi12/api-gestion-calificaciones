//Crear la instancia de express
import express from 'express';
import cors from 'cors'

// Importar las rutas
import estudiantesRouter from './routes/estudiantes/estudiantesRoutes.js'; 

// Importar las rutas
import profesoresRouter from './routes/profesores/profesoresRoutes.js'; 

// Importar las rutas
import cursosRouter from './routes/cursos/cursosRoutes.js'; 

// Importar las rutas
import calificacionesRouter from './routes/calificaciones/calificacionesRoutes.js'; 


// Importar las rutas
import MateriasRouter from './routes/materias/materiasRoutes.js'; 


// Importar las rutas
import HorariosRouter from './routes/horarios/horariosRoutes.js'; 
import authRouter from './routes/auth/authRoutes.js';
import StatsRoutes from "./routes/stats/statsRoutes.js";

//Crear la app de express
const app = express();

//Habilitar la captura de datos mediante post / formularios
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Habilitar CORS para permitir las llamadas de otro servidor
// distinto a este (localhost:3001).
app.use(cors())

//Configurar el puerto
const port = 3001;

//Usar las rutas
app.use('/estudiantes', estudiantesRouter); // ESTUDIANTES

//Usar las rutas
app.use('/profesores', profesoresRouter); // profesores

//Usar las rutas
app.use('/cursos', cursosRouter); // cursos

//Usar las rutas
app.use('/materias', MateriasRouter); // materias

//Usar las rutas
app.use('/calificaciones', calificacionesRouter); // Calificaciones

app.use('/auth', authRouter); // Rutas de login

//Usar las rutas
app.use('/horarios', HorariosRouter); // horarios

// Rutas para extraer estadisticas desde la base de datos
app.use('/estadisticas', StatsRoutes);

//Levantar el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

