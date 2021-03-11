//Se desestructura Response y Request desde 'express' para poder utilizar sus propiedades.
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  //Metodo para ejecutar las dos promesas a la vez y seguir con el codigo una vez finalice este.
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true })
      .skip(Number(desde))        //Desde que Usuario regresa
      .limit(Number(limite))      //Limite maximo de cantidad de usuarios a regresar
  ]);

  res.json({ total, usuarios });
}


const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  const salt = bcryptjs.genSaltSync();                  //Generar el numero de cifrados del password (10 default)
  usuario.password = bcryptjs.hashSync(password, salt); //Encriptar el password

  await usuario.save(); //guardar en DB

  res.json({ usuario });
}


const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();                //Generar el numero de cifrados del password (10 default)
    resto.password = bcryptjs.hashSync(password, salt); //Encriptar el password
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
}


const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }); //Borrado de la DB (estado = false)

  res.json(usuario);
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete
}