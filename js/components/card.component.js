window.TechNews.cardComponent = (({ dom }) => {
  const { escapar } = dom;

  const plantilla = ({ id, titulo, categoria, resumen, imagen }) => `
    <article class="card">
      ${imagen
        ? `<img class="card__imagen" src="${escapar(imagen)}" alt="${escapar(titulo)}">`
        : '<div class="card__imagen"></div>'}
      <div class="card__cuerpo">
        <span class="card__categoria">${escapar(categoria)}</span>
        <h3 class="card__titulo">${escapar(titulo)}</h3>
        <p class="card__resumen">${escapar(resumen)}</p>
        <div class="card__acciones">
          <a class="btn btn--primario btn--pequeno" href="detalle.html?id=${escapar(id)}">Ver más</a>
        </div>
      </div>
    </article>`;

  const lista = (noticias) => noticias.map(plantilla).join('');

  return { plantilla, lista };
})(window.TechNews);
