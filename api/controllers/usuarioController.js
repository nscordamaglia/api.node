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
      if (err) res.status(500).json(err);
      res.json(Usuario);
    });
  };
  
  exports.getUserById = (req, res) => {
    Usuario.findById(req.params.id, (err, Usuario) => {
      if (err) res.send(err);
      res.json(Usuario);
    });
  };
  
  exports.updateUser = (req, res) => {
    Usuario.findByIdAndUpdate(
      { _id: req.params.id},
      req.body,
      { new: true },
      (err, Usuario) => {
        if (err) res.send(err);
        res.json(Usuario);
      }
    );
  };
  
  exports.delUser = (req, res) => {
    Usuario.findByIdAndDelete({ _id: req.params.id }, err => {
      if (err) res.send(err);
      res.json({
        message: 'Usuario  borrado',
       _id: req.params.id
      });
    });
  };