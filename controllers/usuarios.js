//Se desestructura Response y Request desde 'express' para poder utilizar sus propiedades.
const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = 'No name' } = req.query;
  res.json({
    msg: 'get API - controlador',
    q,
    nombre
  });
}

const usuariosPost = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: 'post API - controlador',
    body
  });
}

const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: 'put API - controlador',
    id
  });
}

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador'
  });
}

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'detele API - controlador'
  });
}


module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}