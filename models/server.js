const express = require('express');
const cors = require('cors');


class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    //Middlewares (Funciones que siempre se van a ejecutar al levantar el servidor)
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  middlewares() {

    //CORS (npm para controlar de donde se realizan las peticiones)
    this.app.use(cors());

    //Lectura y parseo del body (peticiones POST, PUT Y DELETE)
    this.app.use(express.json());

    //Directorio publico (Carpeta que se muestra inicialmente)
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port);
  }

}


module.exports = Server;