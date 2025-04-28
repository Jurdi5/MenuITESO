const express = require('express');
const app = express();
const cors = require('cors'); // ← importa cors
app.use(cors()); // ← habilita CORS para todas las rutas
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const usuariosRoutes = require('./routes/usuarios');

app.use(express.json());
app.use('/api/usuarios', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


app.use(express.json());
