const mongoose = require('mongoose');

const platilloSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: String, default: null },
  restaurante: { type: String, required: true }, // el-feo, limon-y-chia, etc.
  creado: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Platillo', platilloSchema);
