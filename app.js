var app = new Framework7({
  el: '#app',

  routes: [
    {
      path: '/',
      content: `
        <div class="page">
          <div class="page-content" style="text-align:center;padding-top:80px;">
            <h1>App Escolar</h1>
            <button class="button button-fill" onclick="irLogin()">
              Ingresar
            </button>
          </div>
        </div>
      `
    },

    {
      path: '/login/',
      content: `
        <div class="page">
          <div class="page-content" style="padding:20px;">
            <h2>Login</h2>

            <input
              id="usuario"
              type="text"
              placeholder="Usuario"
            ><br><br>

            <input
              id="password"
              type="password"
              placeholder="Contraseña"
            ><br><br>

            <button class="button button-fill" onclick="login()">
              Ingresar
            </button>
          </div>
        </div>
      `
    },

    {
      path: '/panel/',
      content: `
        <div class="page">
          <div style="
            background:#2196f3;
            color:white;
            padding:20px;
            text-align:center;
          ">
            <h2 id="nombreAlumno"></h2>
          </div>

          <div class="page-content">
            <div style="
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:10px;
              padding:10px;
            ">
              <button class="button button-fill" onclick="mostrarNotas()">
                📘 Notas
              </button>

              <button class="button button-fill color-red" onclick="mostrarDisciplina()">
                ⚠️ Disciplina
              </button>
            </div>

            <div id="contenido" style="padding:10px;"></div>
          </div>
        </div>
      `,
      on: {
        pageAfterIn: function () {
          cargarPanel();
        }
      }
    }
  ]
});

// Crear vista principal
var mainView = app.views.create('.view-main', {
  url: '/'
});

// URL de Google Apps Script
var url = "https://script.google.com/macros/s/AKfycby6b0ORiFY5JPSgv1qKfJb4PZCqzZIiUw2znW5QOR7TbCe75TMwYEcDlQjumMRvt4fU/exec";

var datosGlobal = null;

// Navegar al login
function irLogin() {
  mainView.router.navigate('/login/');
}

// Iniciar sesión
function login() {
  var usuario = document.getElementById("usuario").value.trim();
  var password = document.getElementById("password").value.trim();

  if (!usuario || !password) {
    app.dialog.alert("Ingrese usuario y contraseña");
    return;
  }

  fetch(
    url +
    "?usuario=" + encodeURIComponent(usuario) +
    "&password=" + encodeURIComponent(password)
  )
    .then(response => response.json())
    .then(data => {
      if (data.status === "ok") {
        datosGlobal = data;
        mainView.router.navigate('/panel/');
      } else {
        app.dialog.alert("Usuario o contraseña incorrectos");
      }
    })
    .catch(error => {
      console.error(error);
      app.dialog.alert("Error de conexión");
    });
}

// Cargar datos del panel
function cargarPanel() {
  if (!datosGlobal) return;

  document.getElementById("nombreAlumno").textContent =
    datosGlobal.nombre || "Estudiante";
}

// Mostrar notas
function mostrarNotas() {
  if (!datosGlobal || !datosGlobal.notas) return;

  var html = "";

  datosGlobal.notas.forEach(function(n) {
    html += `
      <div style="
        background:white;
        margin:10px 0;
        padding:15px;
        border-radius:12px;
        box-shadow:0 4px 10px rgba(0,0,0,0.1);
      ">
        <strong>${n.materia}</strong><br>
        Nota: ${n.nota}
      </div>
    `;
  });

  document.getElementById("contenido").innerHTML = html;
}

// Mostrar disciplina
function mostrarDisciplina() {
  if (!datosGlobal) return;

  var html = "";

  if (!datosGlobal.disciplina || datosGlobal.disciplina.length === 0) {
    html = `
      <div style="padding:20px;text-align:center;">
        Sin registros disciplinarios
      </div>
    `;
  } else {
    datosGlobal.disciplina.forEach(function(d) {
      html += `
        <div style="
          background:white;
          margin:10px 0;
          padding:15px;
          border-radius:12px;
          box-shadow:0 4px 10px rgba(0,0,0,0.1);
        ">
          <strong>📅 ${d.fecha}</strong><br>
          ${d.detalle}
        </div>
      `;
    });
  }

  document.getElementById("contenido").innerHTML = html;
}
