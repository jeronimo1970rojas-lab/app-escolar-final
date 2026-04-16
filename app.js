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
          background: linear-gradient(to bottom, #2196f3, #64b5f6);
          color:white;
        ">

 <img src="https://i.ibb.co/7tHQqBrK/logo.png"
               width="120"
               style="margin-bottom:20px;">

          <h2>COLEGIO BRITANICO</h2>

<img src="https://i.ibb.co/TxXvzg0n/profesor.jpg"
               width="100"
               style="border-radius:50%; margin:20px; border:3px solid white;">

          <p>BIENVENIDO A LA PRE-PROMO 5tO. B</p>
          <p>Cargando información...</p>

        </div>
      </div>
      `
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

          <button onclick="irLogin()">Ingresar</button>

        </div>
      </div>
      `
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

          <button onclick="login()">Ingresar</button>
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

<button style="margin:10px; padding:10px 20px; border:none; border-radius:8px; background:#2196f3; color:white;" onclick="mostrarNotas()">NOTAS</button>

<button style="margin:10px; padding:10px 20px; border:none; border-radius:8px; background:#f44336; color:white;" onclick="mostrarDisciplina()">DISCIPLINA</button>
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
app.views.main = mainView;

// 🚀 INICIO AUTOMÁTICO (MUESTRA PANTALLA 1)
document.addEventListener("DOMContentLoaded", function () {

  var usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioGuardado) {
    // Ya está logueado
    mainView.router.navigate('/panel/');
  } else {
    // Flujo normal
    mainView.router.navigate('/inicio/');

    setTimeout(function () {
      mainView.router.navigate('/info/');
      setTimeout(cargarAvisos, 500);
    }, 8000);
  }

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

  var usuario = document.getElementById("usuario").value;
  var password = document.getElementById("password").value;

  var fullUrl = url + "?usuario=" + usuario + "&password=" + password;

  fetch(fullUrl)
    .then(res => res.text())
    .then(text => {
      console.log("RESPUESTA:", text);
      return JSON.parse(text);
    })
    .then(data => {

      if (data.status === "ok") {
	localStorage.setItem("usuario", usuario);
	localStorage.setItem("nombre", data.nombre);
        mainView.router.navigate('/panel/');

        setTimeout(function(){
          cargarDatos(data);
        }, 500);

      } else {
        alert("Usuario incorrecto");
      }

    })
    .catch(err => {
      console.error("Error:", err);
      alert("Error conectando con el servidor");
    });
}

// 📊 CARGAR DATOS
function cargarDatos(data) {

  document.getElementById("datosProfesor").innerHTML =
    "Estudiante: " + data.nombre;

  var notasHTML = "";

  data.notas.forEach(function(n){
notasHTML += `
  <div style="
    background:white;
    margin:10px;
    padding:15px;
    border-radius:12px;
    box-shadow:0 3px 8px rgba(0,0,0,0.2);
    font-size:16px;">
    
    📘 <b>${n.materia}</b><br>
    Nota: <span style="color:#2196f3; font-weight:bold;">${n.nota}</span>

  </div>
`;
  });

  document.getElementById("notas").innerHTML = notasHTML;

  var discHTML = "";

  data.disciplina.forEach(function(d){
discHTML += `
  <div style="
    background:#ffebee;
    margin:10px;
    padding:15px;
    border-radius:12px;
    box-shadow:0 3px 8px rgba(0,0,0,0.2);">
    
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
      console.log("AVISOS RAW:", text);

      var data = JSON.parse(text);

      var contenedor = document.getElementById("avisos");

      if (!contenedor) return;

      var html = "";

      data.forEach(function(a){
        if (a.mensaje && a.mensaje.trim() !== "") {
          html += `
            <div style="
              background:#fff3cd;
              margin:10px;
              padding:15px;
              border-radius:10px;">
              📢 ${a.mensaje}
            </div>
          `;
        }
      });

      if (html === "") {
        html = "No hay avisos disponibles";
      }

      contenedor.innerHTML = html;

    })
    .catch(err => {
      console.error("Error avisos:", err);
      document.getElementById("avisos").innerHTML = "Error cargando avisos";
    });
}