const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.conectarDB();  //Conectar a base de datos
    this.middlewares(); //Middlewares (Funciones que siempre se ejecutan al levantar el servidor)
    this.routes();      //Levantar las rutas de la aplicacion
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());                   //CORS (npm para controlar de donde se realizan las peticiones)
    this.app.use(express.json());           //Lectura y parseo del body (peticiones POST, PUT Y DELETE)
    this.app.use(express.static('public')); //Directorio publico (Carpeta que se muestra inicialmente)
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port);
  }

}

module.exports = Server;