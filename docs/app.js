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
      margin-bottom:20px;
      border-radius:20px;
      box-shadow:0 4px 15px rgba(0,0,0,0.3);
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
          <h2>INFORMACION GENERAL</h2>

          <div id="avisos">Cargando avisos...</div>

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
        <div class="page-content" style="text-align:center; padding:20px;">
          <h2>LOGIN</h2>

          <input type="text" id="usuario" placeholder="Usuario"><br><br>
          <input type="password" id="password" placeholder="Contraseña"><br><br>

        <button id="btnLogin" style="
  width:100%;
  background: linear-gradient(135deg, #2196f3, #21cbf3);
  border:none;
  color:white;
  padding:12px;
  border-radius:25px;
  font-size:16px;
">
  Ingresar
</button>
        </div>
      </div>
      `
    },

    // 🔴 PANEL
    {
      path: '/panel/',
      content: `
      <div class="page">

        <div style="background:#2196f3; color:white; padding:15px; text-align:center;">
          <h2>REPORTE</h2>
          <p id="datosProfesor"></p>
          <button onclick="logout()">Cerrar sesión</button>
        </div>

        <div class="page-content">

          <button onclick="mostrarNotas()">NOTAS</button>
          <button onclick="mostrarDisciplina()">DISCIPLINA</button>

          <div id="seccionNotas">
            <h3>ACADEMICO</h3>
            <div id="notas"></div>
          </div>

          <div id="seccionDisciplina" style="display:none;">
            <h3>DISCIPLINA</h3>
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

// 🚀 INICIO AUTOMÁTICO
document.addEventListener("DOMContentLoaded", function () {
  localStorage.clear();
  mainView.router.navigate('/inicio/');
});

// 🔗 URL GOOGLE SCRIPT
var url = "https://script.google.com/macros/s/AKfycbzUm_dEoBBu-uIoR-dlZtuR-vzxq7eQXYk82bzlNZd7iieyvF8qgLIAF9mIeI5MJEvH/exec";

// 🟡 IR LOGIN
function irLogin() {
  mainView.router.navigate('/login/');
}

// 🔴 LOGOUT
function logout() {
  localStorage.clear();
  mainView.router.navigate('/login/');
}

// 🔄 CAMBIAR VISTAS
function mostrarNotas() {
  document.getElementById("seccionNotas").style.display = "block";
  document.getElementById("seccionDisciplina").style.display = "none";
}

function mostrarDisciplina() {
  document.getElementById("seccionNotas").style.display = "none";
  document.getElementById("seccionDisciplina").style.display = "block";
}

// 🟢 LOGIN
function login() {
console.log("LOGIN FUNCIONANDO");
  var usuario = document.getElementById("usuario").value;
  var password = document.getElementById("password").value;

  var fullUrl = url + "?usuario=" + usuario + "&password=" + password;

  fetch(fullUrl)
    .then(res => res.text())
    .then(text => JSON.parse(text))
    .then(data => {

      if (data.status === "ok") {

        mainView.router.navigate('/panel/');

        setTimeout(function(){
          cargarDatos(data);
        }, 500);

      } else {
        alert("Usuario o contraseña incorrectos");
      }

    })
    .catch(err => {
      console.error("Error en login:", err);
      alert("Error de conexión");
    });
}

// 📊 CARGAR DATOS
function cargarDatos(data) {

  document.getElementById("datosProfesor").innerHTML =
    "Estudiante: " + data.nombre;

  var notasHTML = "";

  data.notas.forEach(function(n){
    notasHTML += `
      <div>
        📘 <b>${n.materia}</b><br>
        Nota: ${n.nota}
      </div>
    `;
  });

  document.getElementById("notas").innerHTML = notasHTML;

  var discHTML = "";

  data.disciplina.forEach(function(d){
    discHTML += `
      <div>
        ⚠️ ${d.detalle}
      </div>
    `;
  });

  document.getElementById("disciplina").innerHTML = discHTML;
}

// 📢 AVISOS
function cargarAvisos() {

  fetch(url + "?accion=avisos")
    .then(res => res.text())
    .then(text => {

      var data = JSON.parse(text);
      var contenedor = document.getElementById("avisos");

      if (!contenedor) return;

      var html = "";

      data.forEach(function(a){
        if (a.mensaje) {
          html += `<div>📢 ${a.mensaje}</div>`;
        }
      });

      contenedor.innerHTML = html || "No hay avisos";

    })
    .catch(() => {
      document.getElementById("avisos").innerHTML = "Error cargando avisos";
    });
}
// 🔥 EVENTO BOTÓN LOGIN
document.addEventListener("click", function(e) {
  if (e.target && e.target.id === "btnLogin") {
    login();
  }
});
