document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const mensajeDiv = document.getElementById("mensaje");
      mensajeDiv.innerHTML = "";

      try {
        const res = await fetch("http://localhost:3000/api/usuarios/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert("Login exitoso");
          localStorage.setItem("usuarioNombre", data.usuario.nombre);
          localStorage.setItem("usuarioRol", data.usuario.rol);
          localStorage.setItem("usuarioEmail", data.usuario.email);

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
          mensajeDiv.innerHTML = `<div class="alert alert-danger">${data.error || "Credenciales inválidas"}</div>`;
        }
      } catch (err) {
        mensajeDiv.innerHTML = `<div class="alert alert-danger">Error al conectar con el servidor.</div>`;
      }
    });
  }

  const registroForm = document.getElementById("registroForm");
  if (registroForm) {
    registroForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const expediente = document.getElementById("expediente").value;
      const email = document.getElementById("registroEmail").value;
      const password = document.getElementById("registroPassword").value;
      const rol = document.getElementById("rol").value;
      const banco = document.getElementById("banco").value;
      const numero_tarjeta = document.getElementById("tarjeta").value;
      const registroMensaje = document.getElementById("registroMensaje");
      registroMensaje.innerHTML = "";

      if (!rol) {
        registroMensaje.innerHTML = `<div class="alert alert-warning">Debes seleccionar un rol.</div>`;
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, expediente, email, password, rol, banco, numero_tarjeta })
        });

        const data = await res.json();

        if (res.ok) {
          registroMensaje.innerHTML = `<div class="alert alert-success">Usuario creado exitosamente. Ahora inicia sesión.</div>`;
          document.getElementById("registroForm").reset();
          const loginTab = new bootstrap.Tab(document.querySelector('#login-tab'));
          loginTab.show();
        } else {
          registroMensaje.innerHTML = `<div class="alert alert-danger">${data.error || "Error al crear usuario"}</div>`;
        }
      } catch (err) {
        registroMensaje.innerHTML = `<div class="alert alert-danger">Error al conectar con el servidor.</div>`;
      }
    });
  }

  const tarjetaForm = document.getElementById("tarjetaForm");
if (tarjetaForm) {
  tarjetaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const banco = document.getElementById("bancoTarjeta").value;
    const numero_tarjeta = document.getElementById("numeroTarjeta").value;
    const email = localStorage.getItem("usuarioEmail");
    const mensajeDiv = document.getElementById("tarjetaMensaje");
    console.log("⚠️ ENVIANDO TARJETA:", { email, banco, numero_tarjeta }); 
    if (!email) {
      mensajeDiv.innerHTML = `<div class="alert alert-warning">Inicia sesión primero.</div>`;
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, banco, numero_tarjeta })
      });

      const data = await res.json();

      if (res.ok) {
        mensajeDiv.innerHTML = `<div class="alert alert-success">Tarjeta actualizada correctamente.</div>`;
        tarjetaForm.reset();
      } else {
        mensajeDiv.innerHTML = `<div class="alert alert-danger">${data.error || "Error al actualizar tarjeta"}</div>`;
      }
    } catch (err) {
      mensajeDiv.innerHTML = `<div class="alert alert-danger">Error de conexión al servidor.</div>`;
    }
  });
}


  const platilloForm = document.getElementById("crearPlatilloForm");
  if (platilloForm) {
    platilloForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const descripcion = document.getElementById("descripcion").value;
      const precio = document.getElementById("precio").value || null;
      const restaurante = document.getElementById("restaurante").value;
      const mensaje = document.getElementById("mensajeAdmin");

      try {
        const res = await fetch("http://localhost:3000/api/platillos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, descripcion, precio, restaurante })
        });

        const data = await res.json();

        if (res.ok) {
          mensaje.innerHTML = `<div class="alert alert-success">Platillo creado correctamente.</div>`;
          platilloForm.reset();
        } else {
          mensaje.innerHTML = `<div class="alert alert-danger">${data.error || 'Error al guardar platillo'}</div>`;
        }
      } catch (error) {
        mensaje.innerHTML = `<div class="alert alert-danger">Error de conexión con el servidor</div>`;
      }
    });
  }

  const estadoSesion = document.getElementById("estadoSesion");
  const nombreGuardado = localStorage.getItem("usuarioNombre");
  if (estadoSesion) {
    estadoSesion.textContent = nombreGuardado ? `Hola, ${nombreGuardado}` : "No has iniciado sesión";
  }

  const cerrarSesionBtn = document.getElementById("cerrarSesion");
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener("click", () => {
      localStorage.clear();
      location.reload();
    });
  }

  if (document.querySelector("#accordionExample")) {
    cargarPlatillosPorRestaurante();
  }
});

async function cargarPlatillosPorRestaurante() {
  const restaurantes = ["el-feo", "limon-y-chia", "la-taqueria", "el-terrible-Juan", "güich"];
  for (const restaurante of restaurantes) {
    try {
      const res = await fetch(`http://localhost:3000/api/platillos?restaurante=${restaurante}`);
      const platillos = await res.json();
      const contenedor = document.querySelector(`#${restaurante} .accordion-body`);
      if (!contenedor) continue;
      contenedor.innerHTML = platillos.length
        ? platillos.map(p => `
            <div class="mb-3">
              <h5>${p.nombre}</h5>
              <p>${p.descripcion}</p>
              ${p.precio ? `<p><strong>Precio:</strong> $${p.precio}</p>` : ""}
              <button class="btn btn-success btn-sm agregar-carrito" data-nombre="${p.nombre}" data-precio="${p.precio || 0}">Agregar al carrito</button>
              <hr>
            </div>`).join("")
        : `<p class="text-muted">No hay platillos registrados aún.</p>`;
    } catch (err) {
      console.error(`Error cargando platillos de ${restaurante}:`, err);
    }
  }
}
// --- agregar al carrito ---

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar-carrito")) {
    const nombre = e.target.dataset.nombre;
    const precio = e.target.dataset.precio;

    const nuevoProducto = { nombre, precio };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(nuevoProducto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`"${nombre}" agregado al carrito`);
  }
});


// --- Limpiar carrito al cerrar sesión o ir atrás ---
document.addEventListener("DOMContentLoaded", () => {
  const cerrarSesion = document.getElementById("cerrarSesion");
  if (cerrarSesion) {
    cerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("carrito");
    });
  }

  const backBtn = document.querySelector("a[href='alumno.html']");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      localStorage.removeItem("carrito");
    });
  }
});
