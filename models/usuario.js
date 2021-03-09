const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  password: {
    type: String
  },
  rol: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
});

//Metodo para sobreescribir el toJSON. (Para no devolver la version y el password del usuario creado exitosamente).
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
}

module.exports = model('Usuarios', UsuarioSchema);