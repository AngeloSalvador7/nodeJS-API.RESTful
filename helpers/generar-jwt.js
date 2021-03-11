const jwt = require('jsonwebtoken');

//Se trabaja con Promesa porque se utiliza un Callback
const generarJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    /*'jwt.sing' crea el token, contiene 4 argumentos:
    (1-ID, 2-Clave que permite crear tokens, 3-Tiempo util del token a crear, 4-Callback por defecto para crearlo)
    pd: Ejemplos de tiempo a asignar para el tiempo util del token: '24h' o '365d'*/
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '4h' },
      (err, token) => {
        if (err) { console.log(err); reject('No se pudo generar el token;') }
        else { resolve(token); }
      })
  })
}

module.exports = {
  generarJWT
}