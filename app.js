var app = new Framework7({
  el: '#app',
  routes: [

    {
      path: '/',
      content: `
      <div class="page">
        <div class="page-content" style="text-align:center;padding-top:50px;">
          <h2>App Escolar</h2>
          <button onclick="irLogin()">Ingresar</button>
        </div>
      </div>
      `
    },

    {
      path: '/login/',
      content: `
      <div class="page">
        <div class="page-content" style="padding:20px;">
          <h2>Login</h2>

          <input id="usuario" placeholder="Usuario"><br><br>
          <input id="password" type="password" placeholder="Contraseña"><br><br>

          <button onclick="login()">Ingresar</button>
        </div>
      </div>
      `
    },

    {
      path: '/panel/',
      content: `
      <div class="page">
        <div class="page-content">
          <h2 id="nombreAlumno"></h2>
        </div>
      </div>
      `,
      on: {
        pageAfterIn: () => {
          cargarPanel();
        }
      }
    }

  ]
});

// VIEW
var mainView = app.views.create('.view-main', {
  url: '/'
});

// URL (la tuya)
var url = "https://script.google.com/macros/s/AKfycby6b0ORiFY5JPSgv1qKfJb4PZCqzZIiUw2znW5QOR7TbCe75TMwYEcDlQjumMRvt4fU/exec";

var datosGlobal = null;

// LOGIN
function login(){
  var usuario = document.getElementById("usuario").value;
  var password = document.getElementById("password").value;

  fetch(url + "?usuario=" + usuario + "&password=" + password)
    .then(res => res.text())
    .then(text => {
      console.log(text);

      var data = JSON.parse(text);

      if (data.status === "ok") {
        datosGlobal = data;
        mainView.router.navigate('/panel/');
      } else {
        alert("Error login");
      }
    })
    .catch(() => alert("Error conexión"));
}

// PANEL
function cargarPanel(){
  if (!datosGlobal) return;

  document.getElementById("nombreAlumno").innerHTML = datosGlobal.nombre;
}

// NAV
function irLogin(){
  mainView.router.navigate('/login/');
}
