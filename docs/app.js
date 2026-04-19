// 🔵 APP
var app = new Framework7({
  el: '#app',
  name: 'App Escolar',
  id: 'com.app.escolar',

  routes: [

    // 🔵 INICIO
    {
      path: '/inicio/',
      content: `
      <div class="page">
        <div class="page-content" style="
          display:flex;flex-direction:column;justify-content:center;align-items:center;
          height:100vh;text-align:center;
          background: linear-gradient(135deg, #1e88e5, #42a5f5);
          color:white;
        ">
          <img src="logo.png" style="width:120px;border-radius:20px;margin-bottom:20px;">
          <h1>Colegio Británico</h1>
          <p>Sistema Académico</p>
          <img src="profesor.jpg" style="width:100px;height:100px;border-radius:50%;margin:20px 0;">
          <p>Cargando aplicación...</p>
        </div>
      </div>
      `,
      on: {
        pageAfterIn: () => setTimeout(() => mainView.router.navigate('/info/'), 3000)
      }
    },

    // 🟡 INFO
    {
      path: '/info/',
      content: `
      <div class="page">
        <div class="page-content" style="padding:20px;text-align:center;">
          <h2>Información General</h2>
          <div id="avisos"></div>
          <button onclick="irLogin()" style="padding:12px 25px;border:none;background:#2196f3;color:white;border-radius:20px;">
            Ingresar
          </button>
        </div>
      </div>
      `,
      on: { pageAfterIn: cargarAvisos }
    },

    // 🟢 LOGIN
    {
      path: '/login/',
      content: `
      <div class="page">
        <div class="page-content" style="display:flex;justify-content:center;align-items:center;height:100vh;background:#2196f3;">
          <div style="background:white;padding:30px;border-radius:20px;width:90%;max-width:350px;text-align:center;">
            <h2>Login</h2>
            <input id="usuario" placeholder="Usuario" style="width:100%;padding:12px;margin-bottom:10px;">
            <input id="password" type="password" placeholder="Contraseña" style="width:100%;padding:12px;margin-bottom:15px;">
            <button onclick="login()" style="width:100%;padding:12px;background:#2196f3;color:white;border:none;border-radius:20px;">
              Ingresar
            </button>
          </div>
        </div>
      </div>
      `
    },

    // 🔴 PANEL
    {
      path: '/panel/',
      content: `
      <div class="page">

        <div style="background:#2196f3;color:white;padding:20px;text-align:center;">
          <h2>REPORTE</h2>
          <p id="datosProfesor"></p>
          <button onclick="logout()" style="background:white;color:#2196f3;border:none;padding:6px 15px;border-radius:20px;">
            Salir
          </button>
        </div>

        <div style="display:flex;padding:10px;gap:10px;">
          <button onclick="mostrarNotas()" style="flex:1;background:#2196f3;color:white;padding:10px;border:none;border-radius:10px;">Notas</button>
          <button onclick="mostrarDisciplina()" style="flex:1;background:#ff7043;color:white;padding:10px;border:none;border-radius:10px;">Disciplina</button>
        </div>

        <div class="page-content" style="padding:10px;padding-bottom:80px;">
          <div id="seccionNotas">
            <div id="notas"></div>
          </div>

          <div id="seccionDisciplina" style="display:none;">
            <div id="disciplina"></div>
          </div>
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

// URL
var url = "https://script.google.com/macros/s/AKfycbzUm_dEoBBu-uIoR-dlZtuR-vzxq7eQXYk82bzlNZd7iieyvF8qgLIAF9mIeI5MJEvH/exec";

// FUNCIONES
function irLogin(){ mainView.router.navigate('/login/'); }
function logout(){ mainView.router.navigate('/login/'); }

function mostrarNotas(){
  seccionNotas.style.display="block";
  seccionDisciplina.style.display="none";
}

function mostrarDisciplina(){
  seccionNotas.style.display="none";
  seccionDisciplina.style.display="block";
}

// LOGIN
function login(){
  let u = usuario.value;
  let p = password.value;

  fetch(url+"?usuario="+u+"&password="+p)
  .then(r=>r.text())
  .then(t=>{
    try{
      let data = JSON.parse(t);

      if(data.status==="ok"){
        mainView.router.navigate('/panel/');
        setTimeout(()=>cargarDatos(data),500);
      } else alert("Usuario incorrecto");

    }catch{
      alert("Error servidor");
    }
  })
  .catch(()=>alert("Error conexión"));
}

// DATOS
function cargarDatos(data){

  datosProfesor.innerHTML = "Estudiante: " + data.nombre;

  let notasHTML="";
  data.notas.forEach(n=>{
    notasHTML+=`
    <div style="background:white;margin:10px;padding:15px;border-radius:15px;">
      <b>${n.materia}</b><br>Nota: ${n.nota}
    </div>`;
  });

  notas.innerHTML = notasHTML;

  let discHTML="";
  data.disciplina.forEach(d=>{
    discHTML+=`
    <div style="background:#ffeaea;margin:10px;padding:15px;border-radius:15px;">
      ⚠️ ${d.detalle}
    </div>`;
  });

  disciplina.innerHTML = discHTML;
}

// AVISOS
function cargarAvisos(){
  fetch(url+"?accion=avisos")
  .then(r=>r.text())
  .then(t=>{
    let data=JSON.parse(t);
    let html="";
    data.forEach(a=>{
      html+=`<div style="background:#fff3cd;margin:10px;padding:10px;border-radius:10px;">${a.mensaje}</div>`;
    });
    avisos.innerHTML=html;
  });
}
