const express = require('express');
const {
    getAlumnos,
    getAlumnoById,
    addAlumno,
    updateAlumno,
    deleteAlumno
} = require('../controllers/alumnos');

const router = express.Router();

router.get('/', getAlumnos);
router.get('/:legajo', getAlumnoById);
router.post('/', addAlumno);
router.put('/:legajo', updateAlumno);
router.delete('/:legajo', deleteAlumno);

module.exports = router;
