window.TechNews.navegacionComponent = (({ dom }) => {
  const marcarActivo = () => {
    const actual = location.pathname.split('/').pop() || 'index.html';

    dom.buscarTodos('.nav__enlace')
      .filter((enlace) => enlace.getAttribute('href') === actual)
      .forEach((enlace) => enlace.classList.add('nav__enlace--activo'));
  };

  return { marcarActivo };
})(window.TechNews);
