// ==========================================
// PANTALLA 1 - BIENVENIDA
// ==========================================
{
  path: '/',
  content: `
  <div class="page no-navbar">
    <div class="page-content" style="
      background: linear-gradient(135deg, #1565c0, #42a5f5);
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 30px 20px 40px;
      box-sizing: border-box;
      text-align: center;
      color: white;
    ">

      <div>
        <img src="logo.png" style="
          width: 130px;
          height: 130px;
          object-fit: contain;
          margin-top: 10px;
          margin-bottom: 20px;
        ">

        <h1 style="
          margin: 0;
          font-size: 30px;
          font-weight: bold;
        ">
          PRE-PROMO "B"
        </h1>

        <h2 style="
          margin: 10px 0 0 0;
          font-size: 24px;
          font-weight: normal;
        ">
          CBSC
        </h2>
      </div>

      <div>
        <img src="profesor.jpg" style="
          width: 180px;
          height: 180px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid white;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        ">

        <p style="
          margin-top: 25px;
          font-size: 18px;
        ">
          ¡Bienvenidos al Sistema Académico!
        </p>
      </div>

    </div>
  </div>
  `,
  on: {
    pageAfterIn: function () {
      setTimeout(function () {
        mainView.router.navigate('/avisos/');
      }, 3000);
    }
  }
},

// ==========================================
// PANTALLA 2 - AVISOS
// ==========================================
{
  path: '/avisos/',
  content: `
  <div class="page">

    <div class="navbar">
      <div class="navbar-inner">
        <div class="title" style="
          width:100%;
          text-align:center;
          font-size:26px;
          font-weight:bold;
        ">
          📢 Avisos Generales
        </div>
      </div>
    </div>

    <div class="page-content" style="
      padding:15px;
      padding-bottom:90px;
      background:#f5f5f5;
    ">
      <div id="listaAvisos">
        <p style="text-align:center;">Cargando avisos...</p>
      </div>
    </div>

    <div style="
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      background:white;
      padding:15px;
      box-shadow:0 -4px 15px rgba(0,0,0,0.1);
      z-index:999;
      box-sizing:border-box;
    ">
      <button
        class="button button-fill button-large"
        style="width:100%;"
        onclick="irLogin()"
      >
        Ingresar
      </button>
    </div>

  </div>
  `,
  on: {
    pageAfterIn: function () {
      cargarAvisos();
    }
  }
},

// ==========================================
// PANTALLA 3 - LOGIN
// ==========================================
{
  path: '/login/',
  content: `
  <div class="page">

    <div class="navbar">
      <div class="navbar-inner">
        <div class="title" style="
          width:100%;
          text-align:center;
          font-size:26px;
          font-weight:bold;
        ">
          🔐 Iniciar Sesión
        </div>
      </div>
    </div>

    <div class="page-content" style="
      padding:25px;
      background:#f5f5f5;
    ">

      <div class="list no-hairlines-md no-hairlines-between">
        <ul>

          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-input-wrap">
                <input
                  type="text"
                  id="usuario"
                  placeholder="Ingrese su usuario"
                  autocomplete="username"
                >
              </div>
            </div>
          </li>

          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-input-wrap">
                <input
                  type="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  autocomplete="current-password"
                >
              </div>
            </div>
          </li>

        </ul>
      </div>

      <button
        class="button button-fill button-large"
        style="margin-top:30px;"
        onclick="login()"
      >
        Ingresar
      </button>

    </div>
  </div>
  `
}
