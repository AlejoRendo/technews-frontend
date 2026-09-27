window.TechNews.noticiasService = (({ storage, NOTICIAS_BASE }) => {
  const CLAVE_USUARIO = 'technews.noticias.usuario';
  const CLAVE_ELIMINADAS = 'technews.noticias.eliminadas';

  const noticiasUsuario = () => storage.leerLista(CLAVE_USUARIO);

  const idsEliminados = () => storage.leerLista(CLAVE_ELIMINADAS);

  // Se recalcula en cada llamada: el archivo de datos manda y localStorage solo guarda el delta.
  const listar = () => {
    const eliminadas = idsEliminados();
    const base = NOTICIAS_BASE.filter(({ id }) => !eliminadas.includes(id));
    return [...base, ...noticiasUsuario()];
  };

  const obtenerPorId = (id) => listar().find((noticia) => noticia.id === id) ?? null;

  const destacadas = () => listar().filter(({ destacada }) => destacada);

  const filtrarPorCategoria = (categoria) => (
    !categoria || categoria === 'Todas'
      ? listar()
      : listar().filter((noticia) => noticia.categoria === categoria)
  );

  const crear = ({ titulo, categoria, resumen, imagen = '' }) => {
    const nueva = {
      id: `u-${Date.now()}`,
      titulo,
      categoria,
      resumen,
      contenido: [resumen],
      imagen,
      autor: 'Redacción TechNews',
      fecha: new Date().toISOString().slice(0, 10),
      destacada: false,
      origen: 'usuario'
    };

    storage.escribir(CLAVE_USUARIO, [...noticiasUsuario(), nueva]);
    return nueva;
  };

  const eliminar = (id) => {
    const noticia = obtenerPorId(id);
    if (!noticia) return false;

    if (noticia.origen === 'usuario') {
      storage.escribir(CLAVE_USUARIO, noticiasUsuario().filter((item) => item.id !== id));
    } else {
      storage.escribir(CLAVE_ELIMINADAS, [...idsEliminados(), id]);
    }

    return true;
  };

  return { listar, obtenerPorId, destacadas, filtrarPorCategoria, crear, eliminar };
})(window.TechNews);
