window.TechNews.filaTablaComponent = (({ dom }) => {
  const { escapar, formatearFecha } = dom;

  const plantilla = ({ id, titulo, categoria, fecha }) => `
    <tr>
      <td class="tabla__celda-titulo">${escapar(titulo)}</td>
      <td class="tabla__celda-suave">${escapar(categoria)}</td>
      <td class="tabla__celda-suave">${escapar(formatearFecha(fecha))}</td>
      <td>
        <button type="button" class="btn btn--peligro btn--pequeno" data-eliminar="${escapar(id)}">Eliminar</button>
      </td>
    </tr>`;

  const lista = (noticias) => noticias.map(plantilla).join('');

  return { plantilla, lista };
})(window.TechNews);
