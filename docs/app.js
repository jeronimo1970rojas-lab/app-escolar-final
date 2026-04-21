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
    <div class="page-content" style="padding:20px;">

      <h2 style="text-align:center;">Avisos</h2>

      <div id="avisos"></div>

    </div>
  </div>
  `,
  on: {
    pageAfterIn: () => {
      cargarAvisos(); // 🔥 ESTO ES CLAVE

      setTimeout(() => {
        mainView.router.navigate('/login/');
      }, 3000);
    }
  }
}
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
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
        ">
          <button onclick="mostrarNotas()">Notas</button>
          <button onclick="mostrarDisciplina()">Disciplina</button>
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


// ✅ VIEW
var mainView = app.views.create('.view-main');

// ✅ INICIO
app.views.main.router.navigate('/');


// 🔗 GOOGLE SCRIPT
var url = "https://script.google.com/macros/s/AKfycbxHdcr-L7vUGnyuXFzQnRNPcsR8J2T2BYxWqypLbFCJfiuGnJQPXjFCACYDJzaYf8iM/exec";

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
  var html = "";

  datosGlobal.notas.forEach(n => {
    html += `
    <div style="background:white;margin:10px 0;padding:15px;border-radius:15px;">
      <b>${n.materia}</b> - ${n.nota}
    </div>
    `;
  });

  document.getElementById("contenido").innerHTML = html;
}


// ⚠️ DISCIPLINA
function mostrarDisciplina(){
  var html = "";

  if (!datosGlobal.disciplina || datosGlobal.disciplina.length === 0) {
    html = "Sin registros";
  } else {
    datosGlobal.disciplina.forEach(d => {
      html += `
      <div style="background:white;margin:10px 0;padding:15px;border-radius:15px;">
        <div style="color:#0d47a1;font-weight:bold;">📅 ${d.fecha || ""}</div>
        <div>${d.detalle || ""}</div>
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

      if (!data || data.length === 0) {
        html = "<div style='text-align:center;color:#777;'>Sin avisos</div>";
      } else {

        data.forEach(a => {
          html += `
          <div style="
            background:white;
            margin:10px 0;
            padding:15px;
            border-radius:15px;
            box-shadow:0 5px 10px rgba(0,0,0,0.1);
          ">
            ${a.mensaje}
          </div>
          `;
        });

      }

      document.getElementById("avisos").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("avisos").innerHTML = "Error al cargar avisos";
    });
}
