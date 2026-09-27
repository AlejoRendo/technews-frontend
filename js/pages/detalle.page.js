(({ dom, noticiasService, favoritosService, navegacionComponent }) => {
  const { escapar, formatearFecha } = dom;

  const pintarNoEncontrada = () => {
    dom.pintar(dom.buscar('#articulo'), `
      <div class="estado-vacio">
        <p class="card__titulo">No encontramos esta noticia</p>
        <p class="estado-vacio__texto">Es posible que haya sido eliminada o que el enlace sea incorrecto.</p>
        <a class="btn btn--primario" href="noticias.html">Ver todas las noticias</a>
      </div>`);
  };

  const textoBotonFavorito = (id) => (
    favoritosService.esFavorito(id) ? '♥ Quitar de favoritos' : '♥ Agregar a favoritos'
  );

  const pintarArticulo = (noticia) => {
    const { id, titulo, categoria, contenido, imagen, autor, fecha } = noticia;

    const parrafos = contenido
      .map((parrafo) => `<p class="articulo__parrafo">${escapar(parrafo)}</p>`)
      .join('');

    dom.pintar(dom.buscar('#articulo'), `
      <a class="articulo__volver" href="noticias.html">← Volver a noticias</a>
      <span class="card__categoria">${escapar(categoria)}</span>
      <h1>${escapar(titulo)}</h1>
      <div class="articulo__meta">
        <span>Por ${escapar(autor)}</span>
        <span>·</span>
        <span>${escapar(formatearFecha(fecha))}</span>
      </div>
      ${imagen
        ? `<img class="articulo__imagen" src="${escapar(imagen)}" alt="${escapar(titulo)}">`
        : '<div class="articulo__imagen"></div>'}
      <div class="articulo__acciones">
        <button type="button" class="btn btn--primario" id="btn-favorito">${textoBotonFavorito(id)}</button>
        <a class="btn btn--secundario" href="contacto.html">Contactar redacción</a>
      </div>
      <div class="articulo__cuerpo">${parrafos}</div>`);

    document.title = `${titulo} | TechNews`;

    dom.buscar('#btn-favorito').addEventListener('click', ({ currentTarget }) => {
      favoritosService.alternar(id);
      currentTarget.textContent = textoBotonFavorito(id);
    });
  };

  const iniciar = () => {
    navegacionComponent.marcarActivo();

    const id = new URLSearchParams(location.search).get('id');
    const noticia = id ? noticiasService.obtenerPorId(id) : null;

    if (noticia) {
      pintarArticulo(noticia);
    } else {
      pintarNoEncontrada();
    }
  };

  document.addEventListener('DOMContentLoaded', iniciar);
})(window.TechNews);
