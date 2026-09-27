(({ dom, CATEGORIAS, noticiasService, cardComponent, navegacionComponent }) => {
  const { escapar } = dom;
  let categoriaActual = 'Todas';

  const pintarNoticias = () => {
    const contenedor = dom.buscar('#listado');
    const noticias = noticiasService.filtrarPorCategoria(categoriaActual);

    if (!noticias.length) {
      dom.pintar(contenedor, `
        <div class="estado-vacio">
          <p class="card__titulo">No hay noticias en esta categoría</p>
          <p class="estado-vacio__texto">Selecciona otra categoría para seguir explorando.</p>
        </div>`);
      return;
    }

    dom.pintar(contenedor, cardComponent.lista(noticias));
  };

  const pintarChips = () => {
    const html = ['Todas', ...CATEGORIAS]
      .map((categoria) => {
        const clase = categoria === categoriaActual ? 'chip chip--activo' : 'chip';
        return `<button type="button" class="${clase}" data-categoria="${escapar(categoria)}">${escapar(categoria)}</button>`;
      })
      .join('');

    dom.pintar(dom.buscar('#filtros'), html);
  };

  const iniciar = () => {
    navegacionComponent.marcarActivo();
    pintarChips();
    pintarNoticias();

    dom.buscar('#filtros').addEventListener('click', ({ target }) => {
      const boton = target.closest('[data-categoria]');
      if (!boton) return;

      categoriaActual = boton.dataset.categoria;
      pintarChips();
      pintarNoticias();
    });
  };

  document.addEventListener('DOMContentLoaded', iniciar);
})(window.TechNews);
