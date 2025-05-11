const express = require('express');
const router = express.Router();
const Platillo = require('../models/Platillo');

// POST /api/platillos - Crear platillo
router.post('/', async (req, res) => {
  console.log("📥 Datos recibidos:", req.body);
  const { nombre, descripcion, precio, restaurante } = req.body;

  if (!nombre || !descripcion || !restaurante) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const nuevoPlatillo = new Platillo({ nombre, descripcion, precio, restaurante });
    await nuevoPlatillo.save();
    res.status(201).json({ mensaje: "Platillo guardado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar el platillo" });
  }
});

// GET /api/platillos?restaurante=limon-y-chia - Obtener por restaurante
router.get('/', async (req, res) => {
  const { restaurante } = req.query;

  try {
    let platillos = [];

    if (restaurante) {
      platillos = await Platillo.find({ restaurante });
    } else {
      platillos = await Platillo.find(); // todos
    }

    res.json(platillos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener platillos" });
  }
});

module.exports = router;

