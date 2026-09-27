window.TechNews.itemFavoritoComponent = (({ dom }) => {
  const { escapar } = dom;

  const plantilla = ({ id, titulo, categoria, resumen, imagen }) => `
    <article class="item-favorito">
      ${imagen
        ? `<img class="item-favorito__imagen" src="${escapar(imagen)}" alt="${escapar(titulo)}">`
        : '<div class="item-favorito__imagen"></div>'}
      <div class="item-favorito__info">
        <span class="card__categoria">${escapar(categoria)}</span>
        <h3 class="card__titulo">${escapar(titulo)}</h3>
        <p class="card__resumen">${escapar(resumen)}</p>
      </div>
      <div class="item-favorito__acciones">
        <a class="btn btn--primario btn--pequeno" href="detalle.html?id=${escapar(id)}">Ver más</a>
        <button type="button" class="btn btn--peligro btn--pequeno" data-quitar="${escapar(id)}">Quitar</button>
      </div>
    </article>`;

  const lista = (noticias) => noticias.map(plantilla).join('');

  return { plantilla, lista };
})(window.TechNews);
