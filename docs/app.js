// 🔵 APP
var app = new Framework7({
  el: '#app',
  name: 'App Escolar',
  id: 'com.app.escolar',

  routes: [

    // 🔵 INICIO (PANTALLA 1)
    {
      path: '/inicio/',
      content: `
      <div class="page">
        <div class="page-content" style="
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          height:100vh;
          text-align:center;
          background: linear-gradient(135deg, #1e88e5, #42a5f5);
          color:white;
        ">

          <img src="logo.png" style="
            width:120px;
            border-radius:20px;
            box-shadow:0 6px 20px rgba(0,0,0,0.3);
            margin-bottom:20px;
          ">

          <h1 style="margin:0;">Colegio Británico</h1>
          <p style="opacity:0.9;">Sistema Académico</p>

          <img src="profesor.jpg" style="
            width:100px;
            height:100px;
            border-radius:50%;
            margin:20px 0;
            border:4px solid white;
          ">

          <p style="font-size:14px;">Cargando aplicación...</p>

        </div>
      </div>
      `,
      on: {
        pageAfterIn: function () {
          setTimeout(function () {
            mainView.router.navigate('/info/');
          }, 3000);
        }
      }
    },

    // 🟡 INFORMACIÓN GENERAL
    {
      path: '/info/',
      content: `
      <div class="page">
        <div class="page-content" style="padding:20px; text-align:center;">
          
          <h2 style="margin-bottom:15px;">Información General</h2>

          <div id="avisos"></div>

          <br>

          <button onclick="irLogin()" style="
            background: linear-gradient(135deg, #2196f3, #21cbf3);
            border:none;
            color:white;
            padding:12px 25px;
            border-radius:25px;
            font-size:16px;
            box-shadow:0 4px 10px rgba(0,0,0,0.2);
          ">
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

    // 🟢 LOGIN
    {
      path: '/login/',
      content: `
      <div class="page">
        <div class="page-content" style="
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
          background: linear-gradient(135deg, #1e88e5, #42a5f5);
        ">

          <div style="
            background:white;
            padding:30px;
            border-radius:20px;
            width:90%;
            max-width:350px;
            box-shadow:0 8px 25px rgba(0,0,0,0.2);
            text-align:center;
          ">

            <h2 style="margin-bottom:20px;">Iniciar Sesión</h2>

            <input type="text" id="usuario" placeholder="Usuario" style="
              width:100%;
              padding:12px;
              margin-bottom:15px;
              border-radius:10px;
              border:1px solid #ccc;
            ">

            <input type="password" id="password" placeholder="Contraseña" style="
              width:100%;
              padding:12px;
              margin-bottom:20px;
              border-radius:10px;
              border:1px solid #ccc;
            ">

            <button onclick="login()" style="
              width:100%;
              background: linear-gradient(135deg, #2196f3, #21cbf3);
              border:none;
              color:white;
              padding:12px;
              border-radius:25px;
              font-size:16px;
              box-shadow:0 4px 10px rgba(0,0,0,0.2);
            ">
              Ingresar
            </button>

          </div>

        </div>
      </div>
      `
    },

    // 🔴 PANEL
    {
      path: '/panel/',
      content: `
      <div class="page">

        <!-- HEADER PRO -->
        <div style="
          background: linear-gradient(135deg, #1e88e5, #42a5f5);
          color:white;
          padding:20px;
          text-align:center;
          border-bottom-left-radius:20px;
          border-bottom-right-radius:20px;
        ">
          <h2 style="margin:0;">Reporte</h2>
          <p id="datosProfesor"></p>

          <button onclick="logout()" style="
            margin-top:10px;
            background:white;
            color:#1e88e5;
            border:none;
            padding:8px 15px;
            border-radius:20px;
          ">
            Cerrar sesión
          </button>
        </div>

        <div class="page-content">

          <!-- BOTONES -->
          <div style="text-align:center;">
            <button onclick="mostrarNotas()" style="
              margin:10px;
              padding:10px 20px;
              border:none;
              border-radius:20px;
              background:#2196f3;
              color:white;
            ">Notas</button>

            <button onclick="mostrarDisciplina()" style="
              margin:10px;
              padding:10px 20px;
              border:none;
              border-radius:20px;
              background:#f44336;
              color:white;
            ">Disciplina</button>
          </div>

          <!-- NOTAS -->
          <div id="seccionNotas">
            <h3 style="padding-left:15px;">Académico</h3>
            <div id="notas"></div>
          </div>

          <!-- DISCIPLINA -->
          <div id="seccionDisciplina" style="display:none;">
            <h3 style="padding-left:15px;">Disciplina</h3>
            <div id="disciplina"></div>
          </div>

        </div>
      </div>
      `
    }

  ]
});

// 📱 VISTA
var mainView = app.views.create('.view-main');

// 🚀 INICIO
document.addEventListener("DOMContentLoaded", function () {
  localStorage.clear();
  mainView.router.navigate('/inicio/');
});

// 🔗 URL
var url = "https://script.google.com/macros/s/AKfycbzUm_dEoBBu-uIoR-dlZtuR-vzxq7eQXYk82bzlNZd7iieyvF8qgLIAF9mIeI5MJEvH/exec";

// FUNCIONES
function irLogin() { mainView.router.navigate('/login/'); }
function logout() { localStorage.clear(); mainView.router.navigate('/login/'); }

function mostrarNotas() {
  document.getElementById("seccionNotas").style.display = "block";
  document.getElementById("seccionDisciplina").style.display = "none";
}

function mostrarDisciplina() {
  document.getElementById("seccionNotas").style.display = "none";
  document.getElementById("seccionDisciplina").style.display = "block";
}

// LOGIN
function login() {
  var usuario = document.getElementById("usuario").value;
  var password = document.getElementById("password").value;

  fetch(url + "?usuario=" + usuario + "&password=" + password)
    .then(res => res.text())
    .then(text => JSON.parse(text))
    .then(data => {
      if (data.status === "ok") {
        mainView.router.navigate('/panel/');
        setTimeout(() => cargarDatos(data), 500);
      } else {
        alert("Usuario incorrecto");
      }
    })
    .catch(() => alert("Error conexión"));
}

// DATOS
function cargarDatos(data) {

  document.getElementById("datosProfesor").innerHTML =
    "Estudiante: " + data.nombre;

  var notasHTML = "";
  data.notas.forEach(n => {
    notasHTML += `
    <div style="
      background:white;
      margin:12px;
      padding:18px;
      border-radius:15px;
      box-shadow:0 5px 15px rgba(0,0,0,0.15);
    ">
      <b>📘 ${n.materia}</b><br>
      Nota: <span style="
        background:#2196f3;
        color:white;
        padding:5px 10px;
        border-radius:10px;
      ">${n.nota}</span>
    </div>`;
  });

  document.getElementById("notas").innerHTML = notasHTML;

  var discHTML = "";
  data.disciplina.forEach(d => {
    discHTML += `
    <div style="
      background:#fff0f0;
      margin:12px;
      padding:15px;
      border-radius:15px;
      border-left:5px solid red;
    ">
      ⚠️ ${d.detalle}
    </div>`;
  });

  document.getElementById("disciplina").innerHTML = discHTML;
}

// AVISOS
function cargarAvisos() {
  fetch(url + "?accion=avisos")
    .then(res => res.text())
    .then(text => {
      var data = JSON.parse(text);
      var html = "";

      data.forEach(a => {
        html += `
        <div style="
          background:#fff3cd;
          margin:10px;
          padding:15px;
          border-radius:10px;
        ">
          📢 ${a.mensaje}
        </div>`;
      });

      document.getElementById("avisos").innerHTML = html;
    });
}
