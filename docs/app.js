var app = new Framework7({
  el: '#app',
  name: 'App Escolar',

  routes: [
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
      text-align:center;
      background:linear-gradient(135deg,#2196f3,#21cbf3);
      color:white;
    ">

      <h1 style="margin-bottom:10px;">📚 App Escolar</h1>
      <p style="margin-bottom:30px;">Bienvenido</p>

      <button onclick="irLogin()" style="
        padding:15px 30px;
        border:none;
        border-radius:25px;
        background:white;
        color:#2196f3;
        font-size:16px;
        font-weight:bold;
      ">
        Ingresar
      </button>

    </div>

  </div>
  `
},

    // 🟦 INICIO (SPLASH)
    {
      path: '/inicio/',
      content: `
      <div class="page">
        <div class="page-content" style="
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
          background: linear-gradient(135deg, #2196f3, #21cbf3);
          color:white;
          flex-direction:column;
        ">
          <h1 style="font-size:28px;">Colegio Británico</h1>
          <p>Cargando...</p>
        </div>
      </div>
      `,
      on: {
        pageAfterIn: () => setTimeout(() => mainView.router.navigate('/login/'), 2500)
      }
    },

    // 🟩 LOGIN PRO
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
            box-shadow:0 10px 25px rgba(0,0,0,0.2);
          ">

            <h2>Login</h2>

            <input id="usuario" placeholder="Usuario" style="
              width:100%;
              padding:12px;
              margin:10px 0;
              border-radius:10px;
              border:1px solid #ccc;
            ">

            <input id="password" type="password" placeholder="Contraseña" style="
              width:100%;
              padding:12px;
              margin:10px 0;
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
            ">
              Ingresar
            </button>

          </div>
        </div>
      </div>
      `
    },

    // 🟨 PANEL PRO
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
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
        ">
          <button onclick="mostrarNotas()" style="
            padding:12px;
            border:none;
            border-radius:15px;
            background:#4caf50;
            color:white;
          ">Notas</button>

          <button onclick="mostrarDisciplina()" style="
            padding:12px;
            border:none;
            border-radius:15px;
            background:#ff9800;
            color:white;
          ">Disciplina</button>
        </div>

        <!-- CONTENIDO -->
        <div class="page-content" style="padding:10px;">
          <div id="contenido"></div>
        </div>

      </div>
      `
    }

  ]
});

// VIEW
var mainView = app.views.create('.view-main', {
  url: '/'
});
mainView.router.navigate('/');

// INICIO
document.addEventListener("DOMContentLoaded", function () {

});

// URL GOOGLE SCRIPT
var url = "https://script.google.com/macros/s/AKfycbzEQjNBEp7JAs2bjAstHTFP_KdLrVA4Z3h2G2HYVhf0dNMIEVCPpAZ4xflOZC1plZEy/exec";

// DATOS GLOBAL
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

// NOTAS (2 COLUMNAS)
function mostrarNotas(){

  var html = "";

  datosGlobal.notas.forEach(n => {
    html += `
    <div style="
      background:white;
      margin:10px 0;
      padding:18px;
      border-radius:15px;
      box-shadow:0 5px 15px rgba(0,0,0,0.15);
      display:flex;
      justify-content:space-between;
      align-items:center;
    ">
      <div>
        <b style="font-size:14px;">${n.materia}</b>
      </div>

      <div style="
        background:#2196f3;
        color:white;
        padding:6px 12px;
        border-radius:12px;
        font-size:16px;
        font-weight:bold;
      ">
        ${n.nota}
      </div>
    </div>
    `;
  });

  document.getElementById("contenido").innerHTML = html;
}
// DISCIPLINA
function mostrarDisciplina(){

  var html = "";

  if (!datosGlobal.disciplina || datosGlobal.disciplina.length === 0) {
    html = `<div style="text-align:center;color:#777;">Sin registros</div>`;
  } else {

    datosGlobal.disciplina.forEach(d => {

      // 🔍 Detectar campos reales
      var fecha = d.fecha || d.Fecha || d.date || d.dia || "";
      var texto = d.detalle || d.descripcion || d.mensaje || d.observacion || "";

      html += `
      <div style="
        background:white;
        margin:10px 0;
        padding:15px;
        border-radius:15px;
        box-shadow:0 5px 10px rgba(0,0,0,0.1);
      ">

     <div style="font-size:13px;color:#0d47a1;margin-bottom:5px;font-weight:bold;">
  📅 ${fecha}
</div>

        <div style="font-size:15px;">
          ${texto}
        </div>

      </div>
      `;
    });

  }

  document.getElementById("contenido").innerHTML = html;
}
// LOGOUT
function logout(){
  datosGlobal = null;
  mainView.router.navigate('/login/');
}
function irLogin(){
  app.views.main.router.navigate('/login/');
}
