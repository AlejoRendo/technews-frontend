(({ dom, favoritosService, itemFavoritoComponent, navegacionComponent }) => {
  const pintar = () => {
    const contenedor = dom.buscar('#lista-favoritos');
    const resumen = dom.buscar('#resumen-favoritos');
    const noticias = favoritosService.listarNoticias();

    if (!noticias.length) {
      resumen.textContent = 'Aún no has guardado noticias.';
      dom.pintar(contenedor, `
        <div class="estado-vacio">
          <span class="estado-vacio__icono">♡</span>
          <p class="card__titulo">Aún no has guardado noticias</p>
          <p class="estado-vacio__texto">Marca como favorita cualquier noticia para verla aquí.</p>
          <a class="btn btn--primario" href="noticias.html">Explorar noticias</a>
        </div>`);
      return;
    }

    const { length } = noticias;
    resumen.textContent = length === 1
      ? 'Tienes 1 noticia guardada en este navegador.'
      : `Tienes ${length} noticias guardadas en este navegador.`;

    dom.pintar(contenedor, itemFavoritoComponent.lista(noticias));
  };

  const iniciar = () => {
    navegacionComponent.marcarActivo();
    pintar();

    dom.buscar('#lista-favoritos').addEventListener('click', ({ target }) => {
      const boton = target.closest('[data-quitar]');
      if (!boton) return;

      favoritosService.quitar(boton.dataset.quitar);
      pintar();
    });
  };

  document.addEventListener('DOMContentLoaded', iniciar);
})(window.TechNews);
