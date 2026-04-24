// Elimina TODO el contenido de app.js
// y reemplázalo por este código completo.

var app = new Framework7({
  el: '#app',

  routes: [
    {
  path: '/',
  content: `
    <div class="page no-navbar">
      <div class="page-content" style="
        background: linear-gradient(135deg,#1565c0,#42a5f5);
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 25px 20px 35px;
        box-sizing: border-box;
        text-align: center;
        color: white;
        overflow: hidden;
      ">

        <div>
          <img src="./logo.png" style="
            width: 110px;
            height: 110px;
            object-fit: contain;
            margin-bottom: 15px;
          ">

          <h1 style="
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          ">
            PRE-PROMO "B"
          </h1>

          <h2 style="
            margin: 8px 0 0;
            font-size: 22px;
            font-weight: normal;
          ">
            CBSC
          </h2>
        </div>

        <div>
          <img src="./profesor.jpg" style="
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid white;
            box-shadow: 0 6px 18px rgba(0,0,0,0.3);
          ">

          <p style="
            margin-top: 20px;
            font-size: 17px;
          ">
            ¡Bienvenidos al Sistema Académico!
          </p>
        </div>

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

    {
      path: '/avisos/',
      content: `
        <div class="page">
          <div class="navbar">
            <div class="navbar-inner">
              <div class="title" style="
                width:100%;
                text-align:center;
                font-size:26px;
                font-weight:bold;
              ">
                📢 Avisos Generales
              </div>
            </div>
          </div>

          <div class="page-content" style="
            background:#f5f5f5;
            padding:15px;
            padding-bottom:90px;
          ">
            <div id="listaAvisos">
              <p style="text-align:center;">Cargando avisos...</p>
            </div>
          </div>

          <div style="
            position:fixed;
            bottom:0;
            left:0;
            width:100%;
            background:#fff;
            padding:15px;
            box-sizing:border-box;
            box-shadow:0 -4px 12px rgba(0,0,0,0.1);
            z-index:999;
          ">
            <button
              class="button button-fill button-large"
              style="width:100%;"
              onclick="irLogin()"
            >
              Ingresar
            </button>
          </div>
        </div>
      `,
      on: {
        pageAfterIn: function () {
          cargarAvisos();
        }
      }
    },

    {
      path: '/login/',
      content: `
        <div class="page">
          <div class="navbar">
            <div class="navbar-inner">
              <div class="title" style="
                width:100%;
                text-align:center;
                font-size:26px;
                font-weight:bold;
              ">
                🔐 Iniciar Sesión
              </div>
            </div>
          </div>

          <div class="page-content" style="
            padding:25px;
            background:#f5f5f5;
          ">
            <div class="list no-hairlines-md">
              <ul>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-input-wrap">
                      <input
                        type="text"
                        id="usuario"
                        placeholder="Ingrese su usuario"
                      >
                    </div>
                  </div>
                </li>

                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-input-wrap">
                      <input
                        type="password"
                        id="password"
                        placeholder="Ingrese su contraseña"
                      >
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <button
              class="button button-fill button-large"
              style="margin-top:30px;"
              onclick="login()"
            >
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

      <div style="
        position:fixed;
        top:85px;
        left:0;
        width:100%;
        padding:15px;
        background:#ffffff;
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
        box-sizing:border-box;
        z-index:999;
        box-shadow:0 3px 10px rgba(0,0,0,0.1);
      ">
        <button
          class="button button-fill"
          onclick="mostrarNotas()"
        >
          📘 Notas
        </button>

        <button
          class="button button-fill button-color-orange"
          onclick="mostrarDisciplina()"
        >
          ⚠️ Disciplina
        </button>
      </div>

      <div class="page-content" style="
        padding:95px 15px 20px;
        background:#f5f5f5;
      ">
        <div id="contenido"></div>
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

var url = 'https://script.google.com/macros/s/AKfycbxrCw1AN5qyuQDEgrJBo4YH1KovwvghDm4prW8M5UQW7Uq9xEuIOLqXIrEiDfuhdDwb/exec';
var datosGlobal = null;

function irLogin() {
  mainView.router.navigate('/login/');
}

function cargarAvisos() {
  fetch(url + '?accion=avisos')
    .then(response => response.json())
    .then(data => {
      var html = '';

      if (data.length === 0) {
        html = '<div class="card-app">No hay avisos disponibles.</div>';
      } else {
        data.forEach(function (aviso) {
          html += `
            <div class="card-app">
              <p style="
                color:#1565c0;
                font-weight:bold;
                margin-bottom:10px;
              ">
                📅 ${aviso.fecha}
              </p>

              <h3 style="margin:0;">
                ${aviso.mensaje}
              </h3>
            </div>
          `;
        });
      }

      document.getElementById('listaAvisos').innerHTML = html;
    })
    .catch(function () {
      document.getElementById('listaAvisos').innerHTML =
        '<div class="card-app">Error al cargar avisos.</div>';
    });
}

function login() {
  var usuario = document.getElementById('usuario').value.trim();
  var password = document.getElementById('password').value.trim();

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
    .catch(function () {
      app.dialog.alert('Error de conexión');
    });
}

function cargarPanel() {
  if (!datosGlobal) return;

  document.getElementById('nombreAlumno').textContent =
    datosGlobal.nombre;
}

function mostrarNotas() {
  var html = '';

  datosGlobal.notas.forEach(function (nota) {
    html += `
      <div class="card-app">
        <h3>${nota.materia}</h3>
        <p>Nota: <strong>${nota.nota}</strong></p>
      </div>
    `;
  });

  document.getElementById('contenido').innerHTML = html;
}

function mostrarDisciplina() {
  var html = '';

  if (!datosGlobal.disciplina.length) {
    html = `
      <div class="card-app">
        Sin registros disciplinarios.
      </div>
    `;
  } else {
    datosGlobal.disciplina.forEach(function (item) {
      html += `
        <div class="card-app">
          <p><strong>📅 ${item.fecha}</strong></p>
          <p>${item.detalle}</p>
        </div>
      `;
    });
  }

  document.getElementById('contenido').innerHTML = html;
}
