var app = new Framework7({
  el: '#app',

  routes: [
   // ==========================================
// REEMPLAZAR SOLO LA RUTA "/"
// ==========================================
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

// ==========================================
// REEMPLAZAR SOLO LA RUTA "/panel/"
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

var url = 'https://script.google.com/macros/s/AKfycbw5qQ1LCdGap5ye3Bi9Ir45ep8KtGwSKc5BGVjPfsjjsFM7iorYmHUdC5_XqrV4kVM/exec';

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
