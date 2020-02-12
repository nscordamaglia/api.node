import express from 'express';
const router = express.Router();

//importar controlador
import Controller from '../controllers/usuarioController';

// Agregar usuario
router.post('/create', Controller.addUser);
  
  // Get con parámetros
router.get('/user/:id', Controller.getUsers);
  
  // Get con todos los documentos
  router.get('/user', Controller.getUserById);

  // Delete eliminar una nota
router.delete('/user/:id', Controller.delUser);

  // Put actualizar una nota
router.put('/user/:id', Controller.updateUser);
  
  // Exportamos la configuración de express app
  module.exports = router;