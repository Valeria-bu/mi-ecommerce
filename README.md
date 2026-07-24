# E-Commerce de Belleza y Cuidado Personal

Tienda online profesional desarrollada con HTML5 semántico, SCSS con metodología BEM y JavaScript modular.

## 📋 Descripción del Proyecto

Este es un proyecto de e-commerce completamente responsivo que vende productos de belleza y cuidado personal. Fue desarrollado como parte del curso de Desarrollo Web en Code Together, aplicando conceptos avanzados de HTML semántico, CSS moderno con preprocesadores y manipulación del DOM con JavaScript.

## 🎯 Características Principales

### HTML & Estructura
- ✅ HTML5 completamente semántico
- ✅ Uso correcto de etiquetas semánticas (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ Atributos ARIA para accesibilidad
- ✅ Meta tags SEO optimizados

### CSS & Styling
- ✅ SCSS (Sass) como preprocesador CSS
- ✅ Metodología BEM (Block Element Modifier) para nomenclatura de clases
- ✅ Arquitectura modular de estilos
- ✅ Flexbox y Grid para layouts
- ✅ Diseño completamente responsivo
- ✅ Variables y mixins reutilizables

### JavaScript & Funcionalidades
- ✅ Módulos JavaScript ES6 (importar/exportar)
- ✅ **Menú lateral interactivo con animaciones**
- ✅ **Carrito de compras con localStorage**
- ✅ **Modal elegante para visualizar carrito**
- ✅ Desplazamiento suave a secciones
- ✅ Notificaciones visuales
- ✅ Delegación de eventos

### Otros
- ✅ Estructura de carpetas profesional y ordenada
- ✅ Repositorio en GitHub con control de versiones
- ✅ Alojado en servicio de hosting profesional
- ✅ Documentación completa del código

## 📁 Estructura de Carpetas

```
e-commerce/
├── src/                    # Archivos fuente
│   ├── index.html         # Página principal
│   ├── scss/              # Estilos SCSS
│   │   ├── main.scss      # Archivo principal
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _base.scss
│   │   ├── _header.scss
│   │   ├── _menu.scss
│   │   ├── _modal.scss
│   │   ├── _hero.scss
│   │   ├── _benefits.scss
│   │   ├── _products.scss
│   │   ├── _cta.scss
│   │   └── _footer.scss
│   ├── js/                # JavaScript modular
│   │   ├── main.js        # Archivo principal
│   │   ├── dom.js         # Utilidades del DOM
│   │   ├── menu.js        # Módulo de menú
│   │   ├── cart.js        # Módulo de carrito
│   │   └── scroll.js      # Desplazamiento suave
│   └── assets/            # Recursos
│       └── img/           # Imágenes
├── dist/                  # Archivos compilados
│   ├── css/              # CSS compilado
│   └── js/               # JavaScript compilado
├── .gitignore            # Archivos ignorados en Git
├── package.json          # Dependencias y scripts
└── README.md             # Este archivo
```
├── JavaScript/
│   └── scripts.js         # Lógica de JavaScript
├── img/                   # Imágenes de productos
├── README.md              # Este archivo
└── firebase.json          # Configuración Firebase
```

## 🚀 Cómo Usar

1. **Abrir el proyecto:**
   - Abre `index.html` en tu navegador

2. **Menú Lateral:**
   - Haz clic en el icono de hamburguesa (≡) para abrir el menú
   - Haz clic en un enlace para navegar y cerrar automáticamente
   - O haz clic en la "X" para cerrarlo manualmente

3. **Agregar Productos al Carrito:**
   - Ve a la página de "Productos"
   - Haz clic en "Agregar al carrito" en cualquier producto
   - Verás el badge del carrito incrementarse

4. **Ver Carrito:**
   - Haz clic en el icono del carrito (🛒) en el header
   - Se abrirá un modal elegante con tu carrito
   - Puedes eliminar productos o vaciar todo

## 💾 Persistencia de Datos

El carrito se guarda en el `localStorage` del navegador, lo que significa:
- Los productos se mantienen aunque cierres la pestaña
- Los datos se borran si limpias el caché/datos del navegador

## 🎨 Diseño

- **Colores:** Paleta de purpura, rosa y naranja
- **Tipografía:** Segoe UI, Tahoma, Geneva, Verdana
- **Diseño Responsivo:** Optimizado para desktop y móvil
- **Animaciones:** Transiciones suaves en botones y menú

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles
- ✅ Tablets
- ✅ Pantallas de escritorio

## 🔧 Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript Vanilla** - Funcionalidad sin frameworks
- **localStorage API** - Persistencia de datos

## 📝 Notas para la Entrega

Este proyecto cumple con todos los requisitos de la práctica:

1. ✅ Menú lateral con hamburguesa y X
2. ✅ Badge del carrito visible
3. ✅ Botones "Agregar al carrito"
4. ✅ Funcionalidad libre: Modal mejorado del carrito

## 👨‍💻 Autor

Proyecto de práctica - Code Together

---

**¡Listo para entregar! 🎉**

Comprime todo el directorio `e-commerce` en un archivo `.zip` y cárgalo en la plataforma EBAC.
