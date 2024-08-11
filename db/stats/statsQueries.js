import config from '../../config.js';

const getStatsHomePageQuery = () => {
    return new Promise((resolve, reject) => {
        config.query('SELECT ' +
            '(SELECT COUNT(*) FROM usuarios WHERE tipo = 3) AS student_count,' +
            '(SELECT COUNT(*) FROM  usuarios WHERE tipo = 2) AS teacher_count,' +
            '(SELECT COUNT(*) FROM cursos) AS course_count,' +
            '(SELECT COUNT(*) FROM materias) AS subject_count,' +
            '(SELECT COUNT(*) FROM horarios) AS schedule_count,' +
            '(SELECT COUNT(*) FROM calificaciones) AS calification_count;', (err, filas) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(filas);
            }
        });
    });
};

export {
    getStatsHomePageQuery
}
