(({ dom, CATEGORIAS, noticiasService, validaciones, filaTablaComponent, navegacionComponent }) => {
  const { escapar } = dom;
  const { requerido, longitudMinima, aplicar, limpiar } = validaciones;

  const pintarTabla = () => {
    const noticias = noticiasService.listar();
    const { length } = noticias;

    dom.buscar('#contador-registros').textContent = length === 1
      ? '1 registro'
      : `${length} registros`;

    dom.pintar(dom.buscar('#cuerpo-tabla'), length
      ? filaTablaComponent.lista(noticias)
      : '<tr><td colspan="4" class="tabla__celda-suave">No hay noticias publicadas.</td></tr>');
  };

  const pintarCategorias = () => {
    const opciones = CATEGORIAS
      .map((categoria) => `<option value="${escapar(categoria)}">${escapar(categoria)}</option>`)
      .join('');

    dom.buscar('#campo-categoria').innerHTML =
      `<option value="">Selecciona una categoría</option>${opciones}`;
  };

  const validar = ({ titulo, categoria, resumen }) => [
    aplicar(titulo, requerido(titulo.value, 'El título')),
    aplicar(categoria, requerido(categoria.value, 'La categoría')),
    aplicar(resumen, longitudMinima(resumen.value, 10, 'La descripción'))
  ].every(Boolean);

  const iniciar = () => {
    navegacionComponent.marcarActivo();
    pintarCategorias();
    pintarTabla();

    const formulario = dom.buscar('#form-noticia');
    const aviso = dom.buscar('#aviso-creada');

    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      aviso.hidden = true;

      if (!validar(formulario)) return;

      const { titulo, categoria, resumen, imagen } = formulario;
      noticiasService.crear({
        titulo: titulo.value.trim(),
        categoria: categoria.value,
        resumen: resumen.value.trim(),
        imagen: imagen.value.trim()
      });

      formulario.reset();
      limpiar(formulario);
      aviso.hidden = false;
      pintarTabla();
    });

    dom.buscar('#btn-cancelar').addEventListener('click', () => {
      formulario.reset();
      limpiar(formulario);
      aviso.hidden = true;
    });

    dom.buscar('#cuerpo-tabla').addEventListener('click', ({ target }) => {
      const boton = target.closest('[data-eliminar]');
      if (!boton) return;

      const { id, titulo } = noticiasService.obtenerPorId(boton.dataset.eliminar);
      if (!confirm(`¿Eliminar la noticia "${titulo}"?`)) return;

      noticiasService.eliminar(id);
      aviso.hidden = true;
      pintarTabla();
    });
  };

  document.addEventListener('DOMContentLoaded', iniciar);
})(window.TechNews);
