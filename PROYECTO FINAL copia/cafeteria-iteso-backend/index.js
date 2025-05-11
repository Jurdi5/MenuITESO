const express = require('express');
const app = express();
const cors = require('cors'); // ← importa cors
app.use(cors()); // ← habilita CORS para todas las rutas
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
app.use(express.static(path.join(__dirname, '../cafeteria-iteso-frontend')));

// URL local o de MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cafeteria-iteso';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));
app.use(express.json());
const usuariosRoutes = require('./routes/usuarios');
const platillosRoutes = require('./routes/platillos');
app.use('/api/platillos', platillosRoutes);



app.use('/api/usuarios', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


app.use(express.json());
