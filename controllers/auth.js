const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    //Verificar si el usuario existe (con el correo)
    if (!usuario) {
      return res.status(400).json({ msg: 'Usuario / Password no son correctos - correo' });
    }
    //Verificar si esta activo (true-false)
    if (!usuario.estado) {
      return res.status(400).json({ msg: 'Usuario / Password no son correctos - estado: false' });
    }
    //Verificar la contrasenia encriptada con 'bcryptjs' (true o false)
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'Usuario / Password no son correctos - password' });
    }
    //Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({ usuario, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Hable con el administrador' })
  }
}

module.exports = {
  login
}