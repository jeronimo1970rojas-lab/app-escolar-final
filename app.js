var app = new Framework7({
  el: '#app',
  name: 'App Escolar',

  routes: [

    // 🟦 PANTALLA 1 - BIENVENIDA
    {
      path: '/',
      content: `
      <div class="page">
        <div style="
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          height:100vh;
          background:linear-gradient(135deg,#2196f3,#21cbf3);
          color:white;
          text-align:center;
        ">
          <img src="logo.png" style="width:120px;margin-bottom:20px;">
          <h2>Bienvenido</h2>
          <img src="profesor.jpg" style="width:120px;border-radius:50%;margin:15px 0;">
          <p>Plataforma educativa</p>
        </div>
      </div>
      `,
      on: {
        pageAfterIn: () => {
          setTimeout(() => {
            mainView.router.navigate('/info/');
          }, 2500);
        }
      }
    },

    // 🟨 AVISOS
    {
      path: '/info/',
      content: `
      <div class="page">

        <div style="
          position:fixed;
          top:0;
          width:100%;
          background:#2196f3;
          color:white;
          text-align:center;
          padding:15px;
          z-index:10;
        ">
          <h3 style="margin:0;">📢 Avisos</h3>
        </div>

        <div class="page-content" style="padding:80px 15px 90px 15px;">
          <div id="avisos"></div>
        </div>

        <div style="
          position:fixed;
          bottom:0;
          width:100%;
          background:white;
          padding:10px;
          box-shadow:0 -2px 10px rgba(0,0,0,0.1);
        ">
          <button id="btnContinuar" style="
            width:100%;
            padding:15px;
            background:#2196f3;
            color:white;
            border:none;
            border-radius:25px;
          ">
            Continuar
          </button>
        </div>

      </div>
      `,
      on: {
        pageAfterIn: () => {
          cargarAvisos();

          document.getElementById("btnContinuar").onclick = function(){
            mainView.router.navigate('/login/');
          };
        }
      }
    },

    // 🟩 LOGIN
    {
      path: '/login/',
      content: `
      <div class="page">
        <div class="page-content" style="
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
          background:#2196f3;
        ">
          <div style="
            background:white;
            padding:25px;
            border-radius:20px;
            width:90%;
            max-width:320px;
            text-align:center;
          ">
            <h2>Login</h2>
            <input id="usuario" placeholder="Usuario"><br><br>
            <input id="password" type="password" placeholder="Contraseña"><br><br>
            <button onclick="login()" style="
              width:100%;
              background:#2196f3;
              color:white;
              padding:12px;
              border:none;
              border-radius:20px;
            ">
              Ingresar
            </button>
          </div>
        </div>
      </div>
      `
    },

    // 🟧 PANEL
    {
      path: '/panel/',
      content: `
      <div class="page">

        <div style="background:#2196f3;color:white;padding:15px;text-align:center;">
          <h3 id="nombreAlumno"></h3>
          <button onclick="logout()">Salir</button>
        </div>

        <div style="position:sticky;top:0;background:#f5f5f5;padding:10px;z-index:10;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <button id="btnNotas" onclick="mostrarNotas()">📘 Notas</button>
            <button id="btnDisciplina" onclick="mostrarDisciplina()">⚠️ Disciplina</button>
          </div>
        </div>

        <div class="page-content" style="padding:10px;">
          <h3 id="tituloSeccion"></h3>
          <div id="contenido"></div>
        </div>

      </div>
      `
    }

  ] // 🔥 AQUÍ SE CIERRA BIEN routes

}); // 🔥 Y AQUÍ SE CIERRA Framework7


// VIEW
var mainView = app.views.create('.view-main');

// INICIO
mainView.router.navigate('/');

// URL
var url = "https://script.google.com/macros/s/AKfycby6b0ORiFY5JPSgv1qKfJb4PZCqzZIiUw2znW5QOR7TbCe75TMwYEcDlQjumMRvt4fU/exec";

var datosGlobal = null;


// LOGIN
function login(){
  var usuario = document.getElementById("usuario").value;
  var password = document.getElementById("password").value;

  fetch(url + "?usuario=" + usuario + "&password=" + password)
    .then(res => res.text())
    .then(text => {
      var data = JSON.parse(text);

      if (data.status === "ok") {
        datosGlobal = data;
        mainView.router.navigate('/panel/');
        setTimeout(() => cargarPanel(), 300);
      } else {
        alert("Usuario incorrecto");
      }
    })
    .catch(() => alert("Error conexión"));
}


// PANEL
function cargarPanel(){
  document.getElementById("nombreAlumno").innerHTML = datosGlobal.nombre;
  mostrarNotas();
}


// NOTAS
function mostrarNotas(){

  document.getElementById("tituloSeccion").innerText = "📘 Notas";

  var html = "";

  datosGlobal.notas.forEach(n => {
    html += `
    <div style="background:white;margin:10px 0;padding:15px;border-radius:15px;">
      <div>${n.materia}</div>
      <div><b>${n.nota}</b></div>
    </div>
    `;
  });

  document.getElementById("contenido").innerHTML = html;
}


// DISCIPLINA
function mostrarDisciplina(){

  document.getElementById("tituloSeccion").innerText = "⚠️ Disciplina";

  var html = "";

  datosGlobal.disciplina.forEach(d => {
    html += `
    <div style="background:white;margin:10px 0;padding:15px;border-radius:15px;">
      <div>📅 ${d.fecha}</div>
      <div>${d.detalle}</div>
    </div>
    `;
  });

  document.getElementById("contenido").innerHTML = html;
}


// LOGOUT
function logout(){
  datosGlobal = null;
  mainView.router.navigate('/login/');
}


// AVISOS
function cargarAvisos(){
  fetch(url + "?accion=avisos")
    .then(res => res.text())
    .then(text => {
      var data = JSON.parse(text);

      var html = "";

      data.forEach(a => {
        html += `<div style="background:white;margin:10px;padding:15px;">${a.mensaje}</div>`;
      });

      document.getElementById("avisos").innerHTML = html;
    });
}
