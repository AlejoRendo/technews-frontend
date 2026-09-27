window.TechNews.validaciones = (({ dom }) => {
  const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  const requerido = (valor, etiqueta = 'Este campo') => (
    valor?.trim() ? null : `${etiqueta} es obligatorio.`
  );

  const correo = (valor) => {
    const limpio = valor?.trim() ?? '';
    if (!limpio) return 'El correo electrónico es obligatorio.';
    return PATRON_CORREO.test(limpio) ? null : 'Ingresa un correo electrónico válido.';
  };

  const longitudMinima = (valor, minimo, etiqueta = 'Este campo') => {
    const limpio = valor?.trim() ?? '';
    if (!limpio) return `${etiqueta} es obligatorio.`;
    return limpio.length < minimo
      ? `${etiqueta} debe tener al menos ${minimo} caracteres.`
      : null;
  };

  // Pinta el estado del campo y devuelve si superó la validación.
  const aplicar = (control, mensaje) => {
    const campo = control.closest('.campo');
    const salida = campo?.querySelector('.campo__mensaje');

    campo?.classList.toggle('campo--error', mensaje !== null);
    if (salida) salida.textContent = mensaje ?? '';

    return mensaje === null;
  };

  const limpiar = (formulario) => {
    dom.buscarTodos('.campo', formulario).forEach((campo) => {
      campo.classList.remove('campo--error');
      const salida = campo.querySelector('.campo__mensaje');
      if (salida) salida.textContent = '';
    });
  };

  return { requerido, correo, longitudMinima, aplicar, limpiar };
})(window.TechNews);
