(({ dom, validaciones, navegacionComponent }) => {
  const { requerido, correo, longitudMinima, aplicar, limpiar } = validaciones;

  const validar = ({ nombre, correo: campoCorreo, asunto, mensaje }) => [
    aplicar(nombre, requerido(nombre.value, 'El nombre')),
    aplicar(campoCorreo, correo(campoCorreo.value)),
    aplicar(asunto, requerido(asunto.value, 'El asunto')),
    aplicar(mensaje, longitudMinima(mensaje.value, 10, 'El mensaje'))
  ].every(Boolean);

  const iniciar = () => {
    navegacionComponent.marcarActivo();

    const formulario = dom.buscar('#form-contacto');
    const confirmacion = dom.buscar('#confirmacion');

    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      confirmacion.hidden = true;

      if (!validar(formulario)) return;

      formulario.reset();
      limpiar(formulario);
      confirmacion.hidden = false;
    });

    dom.buscar('#btn-limpiar').addEventListener('click', () => {
      formulario.reset();
      limpiar(formulario);
      confirmacion.hidden = true;
    });
  };

  document.addEventListener('DOMContentLoaded', iniciar);
})(window.TechNews);
