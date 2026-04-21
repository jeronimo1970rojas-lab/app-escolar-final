var app = new Framework7({
  el: '#app',
  name: 'App Escolar',

  routes: [

    // 🟦 INICIO
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

          <h1>Colegio Británico</h1>
          <p>Bienvenido</p>

          <button onclick="irInfo()" style="
            margin-top:30px;
            padding:15px 30px;
            border:none;
            border-radius:25px;
            background:white;
            color:#2196f3;
            font-weight:bold;
          ">
            Continuar
          </button>

        </div>
      </div>
      `
    },

    // 🟨 INFORMACIÓN GENERAL
    {
      path: '/info/',
      content: `
      <div class="page">

        <div style="
          padding:20px;
          text-align:center;
        ">

          <h2>Información</h2>

          <img src="profesor.png" style="
            width:120px;
            border-radius:50%;
            margin:15px 0;
          ">

          <p>Bienvenido al sistema escolar.</p>
          <p>Aquí podrás ver notas y disciplina.</p>

          <button onclick="irLogin()" style="
            margin-top:20px;
            padding:12px 25px;
            border:none;
            border-radius:20px;
            background:#2196f3;
            color:white;
          ">
            Ir a Login
          </button>

        </div>

      </div>
      `
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

        <div style="
          background:#2196f3;
          color:white;
          padding:15px;
          text-align:center;
        ">
          <h3 id="nombreAlumno"></h3>
          <button onclick="logout()">Salir</button>
        </div>

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

        <div class="page-content" style="padding:10px;">
          <div id="contenido"></div>
        </div>

      </div>
      `
    }

  ]
});

// VIEW (SIN ERRORES)
var mainView = app.views.create('.view-main');

// INICIO NORMAL
app.views.main.router.navigate('/');


// 🔁 FUNCIONES DE NAVEGACIÓN
function irInfo(){
  mainView.router.navigate('/info/');
}

function irLogin(){
  mainView.router.navigate('/login/');
}


// 🔗 URL
var url = "https://script.google.com/macros/s/AKfycbzEQjNBEp7JAs2bjAstHTFP_KdLrVA4Z3h2G2HYVhf0dNMIEVCPpAZ4xflOZC1plZEy/exec";

// DATOS
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


// DISCIPLINA
function mostrarDisciplina(){
  var html = "";

  datosGlobal.disciplina.forEach(d => {
    html += `
    <div style="background:white;margin:10px 0;padding:15px;border-radius:15px;">
      <div style="color:#0d47a1;font-weight:bold;">📅 ${d.fecha}</div>
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
