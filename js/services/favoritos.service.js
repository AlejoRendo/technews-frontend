window.TechNews.favoritosService = (({ storage, noticiasService }) => {
  const CLAVE = 'technews.favoritos';

  const listarIds = () => storage.leerLista(CLAVE);

  const esFavorito = (id) => listarIds().includes(id);

  const alternar = (id) => {
    const ids = listarIds();
    const agregado = !ids.includes(id);

    storage.escribir(CLAVE, agregado ? [...ids, id] : ids.filter((guardado) => guardado !== id));
    return agregado;
  };

  const quitar = (id) => {
    storage.escribir(CLAVE, listarIds().filter((guardado) => guardado !== id));
  };

  // Descarta los identificadores cuya noticia ya no existe para evitar favoritos huérfanos.
  const listarNoticias = () => listarIds()
    .map((id) => noticiasService.obtenerPorId(id))
    .filter((noticia) => noticia !== null);

  const contar = () => listarNoticias().length;

  return { listarIds, listarNoticias, esFavorito, alternar, quitar, contar };
})(window.TechNews);
