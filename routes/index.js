const alumnosRouter = require('./alumnos');

function routerAPI( app ){
    app.use('/alumnos', alumnosRouter );
    //app.use('/users', usersRouter);
}

module.exports = routerAPI;