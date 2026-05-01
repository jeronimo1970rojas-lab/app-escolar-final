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

            <input id="usuario" type="text" placeholder="Usuario"><br><br>
            <input id="password" type="password" placeholder="Contraseña"><br><br>

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
          <div style="background:#2196f3;color:white;padding:20px;text-align:center;">
            <h2 id="nombreAlumno"></h2>
          </div>

          <div class="page-content">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:10px;">
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

var mainView = app.views.create('.view-main', {
  url: '/'
});

var url = 'https://script.google.com/macros/s/AKfycbz5iXQQ2rpsODlp4Q40LeuHHZ7dHy5AsMEubr8zoz7GTkhDLpHDr_3_SZZ-pSCRjaXt/exec';

var datosGlobal = null;

function irLogin() {
  mainView.router.navigate('/login/');
}

function login() {
  var usuario = document.getElementById('usuario').value.trim();
  var password = document.getElementById('password').value.trim();

  if (!usuario || !password) {
    app.dialog.alert('Ingrese usuario y contraseña');
    return;
  }

  fetch(
    url +
    '?usuario=' + encodeURIComponent(usuario) +
    '&password=' + encodeURIComponent(password)
  )
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        datosGlobal = data;
        mainView.router.navigate('/panel/');
      } else {
        app.dialog.alert('Usuario o contraseña incorrectos');
      }
    })
    .catch(error => {
      console.error(error);
      app.dialog.alert('Error de conexión');
    });
}

function cargarPanel() {
  if (!datosGlobal) return;
  document.getElementById('nombreAlumno').textContent = datosGlobal.nombre;
}

function mostrarNotas() {
  if (!datosGlobal || !datosGlobal.notas) return;

  let html = '';

  datosGlobal.notas.forEach(function(n) {
    html += `
      <div class="card-app">
        <strong>${n.materia}</strong><br>
        Nota: ${n.nota}
      </div>
    `;
  });

  document.getElementById('contenido').innerHTML = html;
}

function mostrarDisciplina() {
  if (!datosGlobal) return;

  let html = '';

  if (!datosGlobal.disciplina || datosGlobal.disciplina.length === 0) {
    html = '<div class="card-app">Sin registros disciplinarios</div>';
  } else {
    datosGlobal.disciplina.forEach(function(d) {
      html += `
        <div class="card-app">
          <strong>📅 ${d.fecha}</strong><br>
          ${d.detalle}
        </div>
      `;
    });
  }

  document.getElementById('contenido').innerHTML = html;
}
