const express = require('express');
const app = express();
const port = 3000;
const routerAPI = require('./routes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1> Página Principal</h1><a href="/alumnos">Lista de Alumnos</a>');
});

routerAPI(app);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})
