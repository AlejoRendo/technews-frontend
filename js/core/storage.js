window.TechNews.storage = (() => {
  // Bajo file:// algunos navegadores tratan el origen como opaco y bloquean el acceso.
  const leer = (clave, porDefecto) => {
    try {
      const crudo = localStorage.getItem(clave);
      return crudo === null ? porDefecto : JSON.parse(crudo);
    } catch {
      return porDefecto;
    }
  };

  const escribir = (clave, valor) => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch {
      return false;
    }
  };

  const eliminar = (clave) => {
    try {
      localStorage.removeItem(clave);
      return true;
    } catch {
      return false;
    }
  };

  const leerLista = (clave) => {
    const valor = leer(clave, []);
    return Array.isArray(valor) ? valor : [];
  };

  return { leer, escribir, eliminar, leerLista };
})();
