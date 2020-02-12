import mongoose from 'mongoose';
import Usuario from '../models/usuario';

exports.getUsers = (req, res) => {
    Usuario.find({}, (err, Usuario) => {
      if (err) res.send(err);
      res.json(Usuario);
    });
  };

  exports.addUser = (req, res) => {
    const nuevoUsuario = new Usuario(req.body);
    nuevoUsuario.save((err, Usuario) => {
      if (err) res.send(err);
      res.json(Usuario);
    });
  };
  
  exports.getUserById = (req, res) => {
    Usuario.findById(req.params.UsuarioId, (err, Usuario) => {
      if (err) res.send(err);
      res.json(Usuario);
    });
  };
  
  exports.updateUser = (req, res) => {
    Usuario.findOneAndUpdate(
      { _id: req.params.UsuarioId },
      req.body,
      { new: true },
      (err, Usuario) => {
        if (err) res.send(err);
        res.json(Usuario);
      }
    );
  };
  
  exports.delUser = (req, res) => {
    Usuario.deleteOne({ _id: req.params.UsuarioId }, err => {
      if (err) res.send(err);
      res.json({
        message: 'Usuario  borrado',
       _id: req.params.UsuarioId
      });
    });
  };