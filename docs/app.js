// APP
var app = new Framework7({
  el: '#app',
  name: 'App Escolar',

  routes: [

    // INICIO
    {
      path: '/inicio/',
      content: `
      <div class="page">
        <div class="page-content" style="display:flex;justify-content:center;align-items:center;height:100vh;background:#2196f3;color:white;flex-direction:column;">
          <h2>Colegio Británico</h2>
          <p>Cargando...</p>
        </div>
      </div>
      `,
      on: {
        pageAfterIn: () => setTimeout(() => mainView.router.navigate('/login/'), 2000)
      }
    },

    // LOGIN
    {
      path: '/login/',
      content: `
      <div class="page">
        <div class="page-content" style="display:flex;justify-content:center;align-items:center;height:100vh;background:#2196f3;">
          <div style="background:white;padding:20px;border-radius:15px;width:90%;max-width:300px;text-align:center;">
            <h2>Login</h2>

            <input id="usuario" placeholder="Usuario" style="width:100%;padding:10px;margin:10px 0;">
            <input id="password" type="password" placeholder="Contraseña" style="width:100%;padding:10px;margin:10px 0;">

            <button onclick="login()" style="width:100%;background:#2196f3;color:white;padding:10px;border:none;border-radius:10px;">
              Ingresar
            </button>
          </div>
        </div>
      </div>
      `
    },

    // PANEL
    {
      path: '/panel/',
      content: `
      <div class="page">

        <div style="background:#2196f3;color:white;padding:15px;text-align:center;">
          <h2>Panel</h2>
          <p id="datos"></p>
          <button onclick="logout()" style="background:white;color:#2196f3;border:none;padding:5px 10px;border-radius:10px;">
            Salir
          </button>
        </div>

        <div class="page-content" style="padding:10px;">
          <div id="contenido"></div>
        </div>

      </div>
      `
    }

  ]
});

// VIEW
var mainView = app.views.create('.view-main');

// INICIO
document.addEventListener("DOMContentLoaded", function () {
  mainView.router.navigate('/inicio/');
});

// 🔴 IMPORTANTE: TU URL REAL
var url = "https://script.google.com/macros/s/AKfycbwANmpVoK2Y-WTBQzlISkMzQIgE73FJ9GpwBY8vlpnxSU5fuPIZOBNJOvDJ06S0VLZQ/exec";

// FUNCIONES
function logout(){
  mainView.router.navigate('/login/');
}

// LOGIN
function login(){
  var usuario = document.getElementById("usuario").value;
  var password = document.getElementById("password").value;

  fetch(url + "?usuario=" + usuario + "&password=" + password)
    .then(res => res.text())
    .then(text => {
      try {
        var data = JSON.parse(text);

        if (data.status === "ok") {
          mainView.router.navigate('/panel/');
          setTimeout(() => cargarDatos(data), 300);
        } else {
          alert("Usuario incorrecto");
        }

      } catch {
        alert("Error del servidor");
      }
    })
    .catch(() => alert("Error de conexión"));
}

// CARGAR DATOS
function cargarDatos(data){

  document.getElementById("datos").innerHTML =
    "Alumno: " + data.nombre;

  var html = "";

  data.notas.forEach(n => {
    html += `
    <div style="background:white;margin:10px;padding:15px;border-radius:10px;">
      <b>${n.materia}</b><br>
      Nota: ${n.nota}
    </div>`;
  });

  document.getElementById("contenido").innerHTML = html;
}
