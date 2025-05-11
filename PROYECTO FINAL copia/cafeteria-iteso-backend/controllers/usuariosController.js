const db = require('../BD');

const obtenerUsuarios = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(results);
    }
  });
};

//module.exports = { obtenerUsuarios };


const loginUsuario = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?';

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error en login:', err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const usuario = results[0];
    res.json({ mensaje: "Login exitoso", usuario });
  });
};
const crearUsuario = (req, res) => {
    const { nombre, expediente, email, password,rol,banco,numero_tarjeta } = req.body;

    const rolesValidos = ['alumno', 'docente', 'local', 'admin'];
        if (!rolesValidos.includes(rol)) {
        return res.status(400).json({ error: "Rol inválido" });
    }
  
    if (!nombre || !expediente || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    if (!email.endsWith('@iteso.mx')) {
        return res.status(400).json({ error: "El correo debe ser institucional (@iteso.mx)" });
      }
      
  
    const buscarEmail = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(buscarEmail, [email], (err, resultados) => {
      if (err) return res.status(500).json({ error: "Error en el servidor" });
  
      if (resultados.length > 0) {
        return res.status(409).json({ error: "El correo ya está registrado" });
      }
  
      const insertarUsuario = `
        INSERT INTO usuarios (nombre, expediente, email, rol, estado, contraseña,banco,numero_tarjeta)
        VALUES (?, ?, ?, ?, 'activo', ?,?,?)
      `;
      
  
      db.query(insertarUsuario, [nombre, expediente, email, rol, password,banco,numero_tarjeta], (err2) => {

        if (err2) return res.status(500).json({ error: "Error al registrar usuario" });
  
        res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
      });
    });

    

  };
  const actualizarTarjeta = (req, res) => {
    const { email, banco, numero_tarjeta } = req.body;
  
    if (!email || !banco || !numero_tarjeta) {
      return res.status(400).json({ error: "Faltan datos" });
    }
  
    const sql = "UPDATE usuarios SET banco = ?, numero_tarjeta = ? WHERE email = ?";
  
    db.query(sql, [banco, numero_tarjeta, email], (err, result) => {
      if (err) {
        console.error("Error al actualizar tarjeta:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
  
      res.json({ mensaje: "Tarjeta actualizada correctamente" });
    });
  };
  
  
module.exports = { obtenerUsuarios, loginUsuario,crearUsuario, actualizarTarjeta};
