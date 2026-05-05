alert("APP.JS CARGADO");

var app = new Framework7();

var mainView = app.views.create('.view-main', {
  url: '/'
});

mainView.router.navigate({
  content: `
    <div class="page">
      <div class="navbar">
        <div class="navbar-inner">
          <div class="title">PRUEBA OK</div>
        </div>
      </div>

      <div class="page-content">
        <div class="block">
          TODO FUNCIONA
        </div>
      </div>
    </div>
  `
});
