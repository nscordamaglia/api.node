import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  apellido: {type: String, required: [true, 'Apellido obligatorio']},
  username: {type: String, required: [true, 'Username obligatorio']},
  email: {type: String, required: [true, 'Email obligatorio']},
});

// Convertir a modelo
const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;