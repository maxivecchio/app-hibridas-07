const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'alumnos.json');

const getAlumnosData = () => {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

const alumnoExiste = (legajo) => {
    const alumnos = getAlumnosData();
    return alumnos.some(a => a.legajo === legajo);
};

exports.getAlumnos = (req, res) => {
    const alumnos = getAlumnosData();
    res.send(alumnos);
};

exports.getAlumnoById = (req, res) => {
    const legajo = req.params.legajo;
    const alumnos = getAlumnosData();
    const alumno = alumnos.find(a => a.legajo === legajo);
    res.json(alumno);
};

exports.addAlumno = (req, res) => {
    const newAlumno = req.body;
    if (alumnoExiste(newAlumno.legajo)) {
        return res.status(400).send('Ya existe un alumno con ese legajo');
    }
    const alumnos = getAlumnosData();
    alumnos.push(newAlumno);
    fs.writeFileSync(dataPath, JSON.stringify(alumnos));
    res.status(201).send('Alumno añadido');
};

exports.updateAlumno = (req, res) => {
    const legajo = req.params.legajo;
    if (!alumnoExiste(legajo)) {
        return res.status(404).send('Alumno no encontrado');
    }
    const updatedAlumno = req.body;
    const alumnos = getAlumnosData();
    const index = alumnos.findIndex(a => a.legajo === legajo);
    alumnos[index] = updatedAlumno;
    fs.writeFileSync(dataPath, JSON.stringify(alumnos));
    res.send('Alumno actualizado');
};

exports.deleteAlumno = (req, res) => {
    const legajo = req.params.legajo;
    if (!alumnoExiste(legajo)) {
        return res.status(404).send('Alumno no encontrado');
    }
    const alumnos = getAlumnosData();
    const filteredAlumnos = alumnos.filter(a => a.legajo !== legajo);
    fs.writeFileSync(dataPath, JSON.stringify(filteredAlumnos));
    res.send('Alumno eliminado');
};
