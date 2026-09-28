# TechNews

Plataforma web de noticias tipo periódico digital. Permite explorar noticias por
categoría, consultar su detalle, guardarlas como favoritas, gestionarlas y
contactar con la redacción.

Proyecto académico del módulo Desarrollo de Front-end — Institución Universitaria
Politécnico Grancolombiano.

## Cómo ejecutar

Abrir `index.html` directamente en el navegador. No requiere servidor ni
instalación de dependencias.

## Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript (ES5+, sin frameworks)
- localStorage para persistencia

## Estructura

```
technews/
├─ index.html          Inicio
├─ noticias.html       Catálogo con filtros por categoría
├─ detalle.html        Detalle de una noticia
├─ favoritos.html      Noticias guardadas
├─ gestionar.html      Creación y eliminación de noticias
├─ contacto.html       Formulario con validaciones
├─ css/                Variables, base, layout, componentes y ajustes por vista
├─ js/
│  ├─ data/            Catálogo inicial de noticias
│  ├─ core/            Acceso a localStorage y utilidades del DOM
│  ├─ services/        Lógica de noticias y favoritos
│  ├─ components/      Generación del marcado reutilizable
│  └─ pages/           Controlador de cada vista
└─ img/noticias/       Imágenes del catálogo
```

## Funcionalidades

| Vista | Descripción |
|---|---|
| Inicio | Bienvenida, noticias destacadas y llamados a la acción |
| Noticias | Catálogo completo filtrable por categoría |
| Detalle | Contenido íntegro y acción de guardar en favoritos |
| Favoritos | Listado personal persistente en el navegador |
| Gestionar | Alta y baja de noticias con confirmación |
| Contacto | Formulario con validación de campos y de correo |

## Persistencia

Los datos del usuario se guardan en `localStorage` bajo tres claves:

- `technews.favoritos` — identificadores de las noticias marcadas
- `technews.noticias.usuario` — noticias creadas desde la vista de gestión
- `technews.noticias.eliminadas` — identificadores de noticias del catálogo inicial que fueron eliminadas

El catálogo inicial reside en el código y no se copia al almacenamiento: en cada
consulta se combina con los cambios del usuario.

## Autor

Jhony Alejandro Grisales Rendón
