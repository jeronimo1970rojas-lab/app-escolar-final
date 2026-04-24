var app = new Framework7({
  el: '#app',

  routes: [
    // ==========================================
    // PANTALLA 1 - BIENVENIDA
    // ==========================================
    {
      path: '/',
      content: `
      <div class="page">
        <div class="page-content splash-screen">
          
          <img src="logo.png" class="logo-colegio">
          
          <img src="profesor.jpg" class="foto-profesor">
          
          <h1>PRE-PROMO "B"</h1>
          <h2>CBSC</h2>
          
          <p class="bienvenida">
            ¡Bienvenidos al Sistema Académico!
          </p>

        </div>
      </div>
      `,
      on: {
        pageAfterIn: function () {
          setTimeout(function () {
            mainView.router.navigate('/avisos/');
          }, 3000);
        }
      }
    },

    // ==========================================
    // PANTALLA 2 - AVISOS
    // ==========================================
    {
      path: '/avisos/',
      content: `
      <div class="page">
        <div class="navbar">
          <div class="navbar-inner">
            <div class="title">Avisos Generales</div>
          </div>
        </div>

        <div class="page-content">
          <div id="listaAvisos" style="padding:15px;">
            <p>Cargando avisos...</p>
          </div>

          <div style="padding:20px;">
            <button class="button button-fill button-large" onclick="irLogin()">
              Ingresar
            </button>
          </div>
        </div>
      </div>
      `,
      on: {
        pageAfterIn: function () {
          cargarAvisos();
        }
      }
    },

    // ==========================================
    // PANTALLA 3 - LOGIN
    // ==========================================
    {
      path: '/login/',
      content: `
      <div class="page">
        <div class="navbar">
          <div class="navbar-inner">
            <div class="title">Iniciar Sesión</div>
          </div>
        </div>

        <div class="page-content" style="padding:20px;">
          <input id="usuario" type="text" placeholder="Usuario">
          <br><br>

          <input id="password" type="password" placeholder="Contraseña">
          <br><br>

          <button class="button button-fill button-large" onclick="login()">
            Ingresar
          </button>
        </div>
      </div>
      `
    },

    // ==========================================
    // PANTALLA 4 - PANEL
    // ==========================================
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
            padding:15px;
          ">
            <button class="button button-fill" onclick="mostrarNotas()">
              📘 Notas
            </button>

            <button class="button button-fill button-color-orange" onclick="mostrarDisciplina()">
              ⚠️ Disciplina
            </button>
          </div>

          <div id="contenido" style="padding:15px;"></div>

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

// ==========================================
// VISTA PRINCIPAL
// ==========================================
var mainView = app.views.create('.view-main', {
  url: '/'
});

// ==========================================
// URL GOOGLE APPS SCRIPT
// ==========================================
var url = "https://script.google.com/macros/s/AKfycbw5i9k3lKB_F1W_lp-_FZNsEVT1RJiU6Yy4dTMydHHSbgjnqoPOQI2zKjkTsBepkABC/exec";

// ==========================================
// VARIABLES GLOBALES
// ==========================================
var datosGlobal = null;

// ==========================================
// NAVEGACIÓN
// ==========================================
function irLogin() {
  mainView.router.navigate('/login/');
}

// ==========================================
// CARGAR AVISOS
// ==========================================
function cargarAvisos() {
  fetch(url + "?accion=avisos")
    .then(response => response.json())
    .then(data => {
      let html = "";

      if (data.length === 0) {
        html = `
          <div class="card-app">
            No hay avisos disponibles.
          </div>
        `;
      } else {
        data.forEach(aviso => {
          html += `
            <div class="card-app">
              <h3>${aviso.mensaje}</h3>
              <p>📅 ${aviso.fecha}</p>
            </div>
          `;
        });
      }

      document.getElementById("listaAvisos").innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      document.getElementById("listaAvisos").innerHTML = `
        <div class="card-app">
          Error al cargar los avisos.
        </div>
      `;
    });
}

// ==========================================
// LOGIN
// ==========================================
function login() {
  var usuario = document.getElementById("usuario").value;
  var password = document.getElementById("password").value;

  fetch(url + "?usuario=" + encodeURIComponent(usuario) + "&password=" + encodeURIComponent(password))
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

// ==========================================
// PANEL
// ==========================================
function cargarPanel() {
  if (!datosGlobal) return;

  document.getElementById("nombreAlumno").innerHTML = datosGlobal.nombre;
}

// ==========================================
// MOSTRAR NOTAS
// ==========================================
function mostrarNotas() {
  let html = "";

  datosGlobal.notas.forEach(nota => {
    html += `
      <div class="card-app">
        <h3>${nota.materia}</h3>
        <p>Nota: <strong>${nota.nota}</strong></p>
      </div>
    `;
  });

  document.getElementById("contenido").innerHTML = html;
}

// ==========================================
// MOSTRAR DISCIPLINA
// ==========================================
function mostrarDisciplina() {
  let html = "";

  if (!datosGlobal.disciplina.length) {
    html = `
      <div class="card-app">
        Sin registros disciplinarios.
      </div>
    `;
  } else {
    datosGlobal.disciplina.forEach(registro => {
      html += `
        <div class="card-app">
          <p>📅 ${registro.fecha}</p>
          <p>${registro.detalle}</p>
        </div>
      `;
    });
  }

  document.getElementById("contenido").innerHTML = html;
}
