document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
        const res = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Login exitoso");

        const rol = data.usuario.rol;
        if (rol === 'alumno') {
            window.location.href = 'alumno.html';
        } else if (rol === 'docente') {
            window.location.href = 'docente.html';
        } else if (rol === 'local') {
            window.location.href = 'local.html';
        } else if (rol === 'admin') {
         window.location.href = 'admin.html';
        } else {
         alert("Rol desconocido. Contacta al administrador.");
        }
      } else {
        document.getElementById("mensaje").innerText = data.error || "Credenciales inválidas";
      }
    } catch (err) {
      document.getElementById("mensaje").innerText = "Error al conectar con el servidor.";
    }
  });

  document.getElementById("mostrarRegistro").addEventListener("click", () => {
    const registro = document.getElementById("registroContainer");
    const boton = document.getElementById("mostrarRegistro");
  
    if (registro.style.display === "none") {
      registro.style.display = "block";
      boton.innerText = "Cancelar";
    } else {
      registro.style.display = "none";
      boton.innerText = "Crear cuenta";
      document.getElementById("registroForm").reset(); // limpia inputs
      document.getElementById("registroMensaje").innerText = ""; // limpia mensaje
    }
  });
  

  document.getElementById("registroForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value;
    const expediente = document.getElementById("expediente").value;
    const email = document.getElementById("registroEmail").value;
    const password = document.getElementById("registroPassword").value;
    const rol = document.getElementById("rol").value;

    // Validar que sí se seleccionó un rol
    if (!rol) {
        document.getElementById("registroMensaje").innerText = "Debes seleccionar un rol.";
        return;
    }
    
    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, expediente, email, password, rol })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        document.getElementById("registroMensaje").innerText = "Usuario creado exitosamente. Ahora inicia sesión.";
        document.getElementById("registroForm").reset();
      } else {
        document.getElementById("registroMensaje").innerText = data.error || "Error al crear usuario";
      }
    } catch (err) {
      document.getElementById("registroMensaje").innerText = "Error al conectar con el servidor.";

    }
  });
  