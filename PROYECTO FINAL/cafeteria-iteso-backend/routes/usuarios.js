const express = require('express');
const router = express.Router();
const { obtenerUsuarios, loginUsuario,crearUsuario } = require('../controllers/usuariosController');


router.get('/', obtenerUsuarios);
router.post('/login', loginUsuario);
router.post('/', crearUsuario);

module.exports = router;




