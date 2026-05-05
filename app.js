var app = new Framework7();

var mainView = app.views.create('.view-main', {
  url: '/'
});

var URL = "https://script.google.com/macros/s/AKfycbw5qQ1LCdGap5ye3Bi9Ir45ep8KtGwSKc5BGVjPfsjjsFM7iorYmHUdC5_XqrV4kVM/exec";

// PANTALLA INICIO
mainView.router.navigate({
  content: `
  <div class="page no-navbar">
    <div class="page-content inicio">

      <div>
        <img src="logo.png" class="logo">
        <h2>PRE PROMO B</h2>
        <h3>CBSC</h3>
      </div>

      <div>
        <img src="profesor.jpg" class="profesor">
        <p>Bienvenidos al sistema académico</p>
      </div>

    </div>
  </div>
  `
});

// IR A AVISOS
setTimeout(() => {
  cargarAvisos();
}, 3000);

function cargarAvisos(){
  mainView.router.navigate({
    content: `
    <div class="page">
      <div class="navbar">
        <div class="navbar-inner">
          <div class="title">Avisos</div>
        </div>
      </div>

      <div class="page-content" id="avisos">
        <p style="text-align:center;">Cargando...</p>
      </div>

      <div class="footer-btn">
        <button class="button button-fill" onclick="irLogin()">Ingresar</button>
      </div>
    </div>
    `
  });

  fetch(URL + "?accion=avisos")
    .then(r => r.json())
    .then(data => {
      let html = "";

      data.forEach(a => {
        html += `
          <div class="card-app">
            <b>${a.fecha}</b><br>
            ${a.mensaje}
          </div>
        `;
      });

      document.getElementById("avisos").innerHTML = html;
    });
}

// LOGIN
function irLogin(){
  mainView.router.navigate({
    content: `
    <div class="page">
      <div class="navbar">
        <div class="navbar-inner">
          <div class="title">Login</div>
        </div>
      </div>

      <div class="page-content" style="padding:20px;">
        <input id="usuario" placeholder="Usuario"><br><br>
        <input id="password" type="password" placeholder="Contraseña"><br><br>

        <button class="button button-fill" onclick="login()">Ingresar</button>
      </div>
    </div>
    `
  });
}

function login(){
  let u = document.getElementById("usuario").value;
  let p = document.getElementById("password").value;

  fetch(URL + "?usuario=" + u + "&password=" + p)
    .then(r => r.json())
    .then(data => {
      if(data.status === "ok"){
        mostrarPanel(data);
      } else {
        app.dialog.alert("Datos incorrectos");
      }
    });
}

// PANEL
function mostrarPanel(data){
  let html = `<h3>${data.nombre}</h3>`;

  html += "<h4>Notas</h4>";
  data.notas.forEach(n=>{
    html += `<p>${n.materia}: ${n.nota}</p>`;
  });

  html += "<h4>Disciplina</h4>";
  data.disciplina.forEach(d=>{
    html += `<p>${d.fecha}: ${d.detalle}</p>`;
  });

  mainView.router.navigate({
    content: `
    <div class="page">
      <div class="navbar">
        <div class="navbar-inner">
          <div class="title">Panel</div>
        </div>
      </div>

      <div class="page-content" style="padding:20px;">
        ${html}
      </div>
    </div>
    `
  });
}
