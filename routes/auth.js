const { Router } = require('express'); //Se extrae Router de 'express' para poder utilizar sus propiedades.
const { check } = require('express-validator'); //Se extrae check de 'express-validator' para validar datos ingresados.
const { login, googleSignin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contrasenia es obligatoria').not().isEmpty(),
  validarCampos
], login);

router.post('/google', [
  check('id_token', 'El id_token es necesario').not().isEmpty(),
  validarCampos
], googleSignin);

module.exports = router;