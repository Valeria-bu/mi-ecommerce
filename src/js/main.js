// ==========================================
// MAIN JS - Inicializar la aplicación
// ==========================================

import { Menu } from './menu.js';
import { Cart } from './cart.js';
import { SmoothScroll } from './scroll.js';

/**
 * Inicializa todas las funcionalidades de la aplicación
 */
function initApp() {
  console.log('🚀 Inicializando aplicación...');

  // Inicializar módulos
  Menu.init();
  Cart.init();
  SmoothScroll.init();

  console.log('✅ Aplicación iniciada correctamente');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Exportar módulos para acceso global si es necesario
window.App = {
  Menu,
  Cart,
  SmoothScroll
};
