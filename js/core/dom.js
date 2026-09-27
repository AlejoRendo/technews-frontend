window.TechNews.dom = (() => {
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const buscar = (selector, contexto = document) => contexto.querySelector(selector);

  const buscarTodos = (selector, contexto = document) => [...contexto.querySelectorAll(selector)];

  // Impide que el contenido escrito por el usuario en el CRUD se interprete como HTML.
  const escapar = (texto) => String(texto ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const pintar = (contenedor, html) => {
    if (contenedor) contenedor.innerHTML = html;
  };

  const formatearFecha = (iso) => {
    const [anio, mes, dia] = String(iso).split('-');
    if (!anio || !mes || !dia) return iso;
    return `${Number(dia)} de ${MESES[Number(mes) - 1]} de ${anio}`;
  };

  return { buscar, buscarTodos, escapar, pintar, formatearFecha };
})();
