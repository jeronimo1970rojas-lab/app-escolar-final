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

          <img src="profesor.jpg" style="
            width:120px;
            border-radius:50%;
            margin:15px 0;
          ">

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

    // 🟨 PANTALLA 2 - INFORMACIÓN
{
  path: '/info/',
  content: `
  <div class="page">

    <!-- 🔵 HEADER FIJO (FUERA DEL SCROLL) -->
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

    <!-- 🟡 CONTENIDO CON SCROLL -->
    <div class="page-content" style="
      padding:80px 15px 90px 15px;
    ">
      <div id="avisos"></div>
    </div>

    <!-- 🟢 BOTÓN FIJO ABAJO -->
    <div style="
      position:fixed;
      bottom:0;
      width:100%;
      background:white;
      padding:10px;
      box-shadow:0 -2px 10px rgba(0,0,0,0.1);
      z-index:10;
    ">
      <button id="btnContinuar" style="
        width:100%;
        padding:15px;
        background:#2196f3;
        color:white;
        border:none;
        border-radius:25px;
        font-size:16px;
      ">
        Continuar
      </button>
    </div>

  </div>
  `,
  on: {
    pageAfterIn: () => {

      cargarAvisos();

      // 🔥 AQUÍ ESTABA EL PROBLEMA
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

   {
  path: '/panel/',
  content: `
  <div class="page">

    <!-- HEADER -->
    <div style="
      background:#2196f3;
      color:white;
      padding:15px;
      text-align:center;
    ">
      <h3 id="nombreAlumno"></h3>
      <button onclick="logout()" style="
        background:white;
        color:#2196f3;
        border:none;
        padding:5px 10px;
        border-radius:10px;
      ">
        Salir
      </button>
    </div>

    <!-- BOTONES FIJOS -->
    <div style="
      position:sticky;
      top:0;
      background:#f5f5f5;
      padding:10px;
      z-index:10;
    ">
      <div id="tabs" style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
      ">

        <button id="btnNotas" onclick="mostrarNotas()" style="
          padding:14px;
          border:none;
          border-radius:15px;
          background:linear-gradient(135deg,#4caf50,#66bb6a);
          color:white;
          font-weight:bold;
          box-shadow:0 4px 10px rgba(0,0,0,0.15);
        ">
          📘 Notas
        </button>

        <button id="btnDisciplina" onclick="mostrarDisciplina()" style="
          padding:14px;
          border:none;
          border-radius:15px;
          background:#e0e0e0;
          color:#555;
          font-weight:bold;
        ">
          ⚠️ Disciplina
        </button>

      </div>
    </div> <!-- 🔥 ESTE DIV FALTABA CERRAR BIEN -->

    <!-- CONTENIDO (SCROLL REAL) -->
    <div class="page-content" style="padding:10px;">

      <h3 id="tituloSeccion" style="margin:10px 5px;"></h3>

      <div id="contenido"></div>

    </div>

  </div>
  `
}
 ] // 🔥 AQUÍ SE CIERRA BIEN routes


// ✅ VIEW
var mainView = app.views.create('.view-main');

// ✅ INICIO
app.views.main.router.navigate('/');


// 🔗 GOOGLE SCRIPT
var url = "https://script.google.com/macros/s/AKfycby6b0ORiFY5JPSgv1qKfJb4PZCqzZIiUw2znW5QOR7TbCe75TMwYEcDlQjumMRvt4fU/exec";

var datosGlobal = null;


// 🔐 LOGIN
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


// 📊 PANEL
function cargarPanel(){
  document.getElementById("nombreAlumno").innerHTML = datosGlobal.nombre;
  mostrarNotas();
}


// 📘 NOTAS
function mostrarNotas(){

  // 🔥 1. TITULO (correcto)
  document.getElementById("tituloSeccion").innerText = "📘 Notas";

  // 🔥 2. BOTONES (MOVER AQUÍ ARRIBA)
  document.getElementById("btnNotas").style.background = "linear-gradient(135deg,#4caf50,#66bb6a)";
  document.getElementById("btnNotas").style.color = "white";

  document.getElementById("btnDisciplina").style.background = "#e0e0e0";
  document.getElementById("btnDisciplina").style.color = "#555";

  var html = "";

  datosGlobal.notas.forEach(n => {

    html += `
    <div style="
      background:white;
      margin:10px 0;
      padding:15px;
      border-radius:15px;
      box-shadow:0 4px 8px rgba(0,0,0,0.08);
    ">

      <div style="font-size:14px;color:#666;">
        ${n.materia}
      </div>

      <div style="
        font-size:20px;
        font-weight:bold;
        color:#2196f3;
      ">
        ${n.nota}
      </div>

    </div>
    `;
  });

  document.getElementById("contenido").innerHTML = html;
}
// ⚠️ DISCIPLINA
function mostrarDisciplina(){
  document.getElementById("tituloSeccion").innerText = "⚠️ Disciplina";
document.getElementById("btnDisciplina").style.background = "linear-gradient(135deg,#ff9800,#ffb74d)";
document.getElementById("btnDisciplina").style.color = "white";

document.getElementById("btnNotas").style.background = "#e0e0e0";
document.getElementById("btnNotas").style.color = "#555";
  var html = "";

  if (!datosGlobal.disciplina || datosGlobal.disciplina.length === 0) {
    html = `<div style="text-align:center;color:#777;">Sin registros</div>`;
  } else {

    datosGlobal.disciplina.forEach(d => {

      var fecha = d.fecha || "";
      var texto = d.detalle || "";

     html += `
<div style="
  background:white;
  margin:10px 0;
  padding:15px;
  border-radius:15px;
  box-shadow:0 4px 8px rgba(0,0,0,0.08);
">

  <div style="font-size:13px;color:#ff9800;font-weight:bold;">
    📅 ${fecha}
  </div>

  <div style="margin-top:5px;">
    ${texto}
  </div>

</div>
`;
    });

  }

  document.getElementById("contenido").innerHTML = html;
}
// 🚪 LOGOUT
function logout(){
  datosGlobal = null;
  mainView.router.navigate('/login/');
}
function cargarAvisos(){

  fetch(url + "?accion=avisos")
    .then(res => res.text())
    .then(text => {
      var data = JSON.parse(text);

      var html = "";

      data.forEach(a => {

        // 🎨 COLOR SEGÚN TIPO
        var color = "#2196f3"; // default azul

        if (a.tipo == "urgente") color = "#f44336"; // rojo
        if (a.tipo == "importante") color = "#ff9800"; // naranja
        if (a.tipo == "info") color = "#4caf50"; // verde

        html += `
        <div style="
          background:white;
          margin:12px 0;
          padding:15px;
          border-radius:15px;
          box-shadow:0 5px 10px rgba(0,0,0,0.1);
          border-left:6px solid ${color};
        ">

          <div style="
            font-size:13px;
            color:#555;
            margin-bottom:5px;
          ">
            📅 ${a.fecha || ""}
          </div>

          <div style="
            font-size:15px;
            font-weight:500;
          ">
            ${a.mensaje}
          </div>

        </div>
        `;
      });

      document.getElementById("avisos").innerHTML = html;
    });
}
function irLogin(){
  mainView.router.navigate('/login/');
}
