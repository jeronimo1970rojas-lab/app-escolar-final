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
          display:flex;justify-content:center;align-items:center;
          height:100vh;background:#2196f3;color:white;flex-direction:column;
        ">
          <img src="logo.png" style="width:100px;border-radius:20px;">
          <h2>Colegio Británico</h2>
          <p>Cargando...</p>
        </div>
      </div>
      `,
      on: {
        pageAfterIn: () => setTimeout(() => mainView.router.navigate('/info/'), 2000)
      }
    },

    // 🟡 INFO
    {
      path: '/info/',
      content: `
      <div class="page">
        <div class="page-content" style="padding:20px;text-align:center;">
          <h2>Información</h2>
          <div id="avisos"></div>
          <button onclick="irLogin()" style="
            background:#2196f3;color:white;padding:12px;border:none;border-radius:20px;
          ">Ingresar</button>
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
        <div class="page-content" style="
          display:flex;justify-content:center;align-items:center;height:100vh;
          background:#2196f3;
        ">
          <div style="background:white;padding:25px;border-radius:20px;width:90%;max-width:350px;text-align:center;">
            <h2>Login</h2>
            <input id="usuario" placeholder="Usuario" style="width:100%;padding:10px;margin:10px 0;">
            <input id="password" type="password" placeholder="Contraseña" style="width:100%;padding:10px;margin:10px 0;">
            <button onclick="login()" style="width:100%;background:#2196f3;color:white;padding:12px;border:none;border-radius:20px;">
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
      <div class="page" style="background:#f5f7fa;">

        <!-- HEADER -->
        <div style="background:#2196f3;color:white;padding:20px;text-align:center;">
          <h2>REPORTE</h2>
          <p id="datosProfesor"></p>
          <button onclick="logout()" style="background:white;color:#2196f3;border:none;padding:6px 15px;border-radius:20px;">
            Salir
          </button>
        </div>

        <!-- BOTONES -->
        <div style="display:flex;padding:10px;gap:10px;">
          <button id="btnNotas" onclick="mostrarNotas()" style="flex:1;background:#2196f3;color:white;padding:10px;border:none;border-radius:10px;">
            📘 Notas
          </button>
          <button id="btnDisciplina" onclick="mostrarDisciplina()" style="flex:1;background:#ddd;color:#555;padding:10px;border:none;border-radius:10px;">
            ⚠️ Disciplina
          </button>
        </div>

        <!-- CONTENIDO -->
        <div class="page-content" style="padding:10px;padding-bottom:100px;">
          <div id="seccionNotas" class="fade"></div>
          <div id="seccionDisciplina" class="fade" style="display:none;"></div>
        </div>

        <!-- MENU ABAJO -->
        <div style="position:fixed;bottom:0;width:100%;background:white;display:flex;border-top:1px solid #ccc;">
          <button onclick="mostrarNotas()" style="flex:1;padding:10px;">📘</button>
          <button onclick="mostrarDisciplina()" style="flex:1;padding:10px;">⚠️</button>
        </div>

      </div>
      `
    }

  ]
});

// VIEW
var mainView = app.views.create('.view-main');

// INICIO
document.addEventListener("DOMContentLoaded", () => {
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
  let u=usuario.value;
  let p=password.value;

  if(!u || !p){ alert("Ingrese datos"); return; }

  fetch(url+"?usuario="+u+"&password="+p)
  .then(r=>r.text())
  .then(t=>{
    try{
      let data=JSON.parse(t);
      if(data.status==="ok"){
        mainView.router.navigate('/panel/');
        setTimeout(()=>cargarDatos(data),500);
      }else alert("Datos incorrectos");
    }catch{
      alert("Error servidor");
    }
  })
  .catch(()=>alert("Sin conexión"));
}

// DATOS
function cargarDatos(data){

  datosProfesor.innerHTML="Estudiante: "+data.nombre;

  let notas="";
  data.notas.forEach(n=>{
    notas+=`
    <div style="background:white;margin:10px;padding:15px;border-radius:15px;">
      <b>${n.materia}</b><br>Nota: ${n.nota}
    </div>`;
  });

  seccionNotas.innerHTML=notas;

  let disc="";
  data.disciplina.forEach(d=>{
    disc+=`<div style="background:#ffeaea;margin:10px;padding:15px;border-radius:15px;">⚠️ ${d.detalle}</div>`;
  });

  seccionDisciplina.innerHTML=disc;
}

// AVISOS
function cargarAvisos(){
  fetch(url+"?accion=avisos")
  .then(r=>r.text())
  .then(t=>{
    try{
      let data=JSON.parse(t);
      let html="";
      data.forEach(a=>{
        html+=`<div style="background:#fff3cd;margin:10px;padding:10px;border-radius:10px;">${a.mensaje}</div>`;
      });
      avisos.innerHTML=html;
    }catch{}
  });
}
