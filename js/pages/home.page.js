(({ dom, noticiasService, cardComponent, navegacionComponent }) => {
  const iniciar = () => {
    navegacionComponent.marcarActivo();

    const destacadas = noticiasService.destacadas().slice(0, 3);
    dom.pintar(dom.buscar('#destacadas'), cardComponent.lista(destacadas));
  };

  document.addEventListener('DOMContentLoaded', iniciar);
})(window.TechNews);
