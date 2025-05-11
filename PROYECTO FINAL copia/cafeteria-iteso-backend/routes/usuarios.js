const express = require('express');
const router = express.Router();
const { obtenerUsuarios, loginUsuario, crearUsuario,actualizarTarjeta } = require('../controllers/usuariosController');

// Rutas válidas
router.get('/', obtenerUsuarios);
router.post('/login', loginUsuario);
router.post('/', crearUsuario);
router.put('/', actualizarTarjeta);


module.exports = router;
