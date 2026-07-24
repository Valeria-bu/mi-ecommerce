// ==========================================
// Menu Module
// ==========================================

import { DOM } from './dom.js';

export const Menu = {
  menuBtn: DOM.byId('menuBtn'),
  closeBtn: DOM.byId('closeMenu'),
  sideMenu: DOM.byId('sideMenu'),
  sideNavLinks: DOM.all('.side-menu__nav-link'),

  init() {
    if (!this.menuBtn || !this.closeBtn || !this.sideMenu) return;

    this.setupEventListeners();
  },

  setupEventListeners() {
    // Abrir menú
    DOM.on(this.menuBtn, 'click', () => this.open());

    // Cerrar menú
    DOM.on(this.closeBtn, 'click', () => this.close());

    // Cerrar menú al hacer clic en enlaces
    this.sideNavLinks.forEach(link => {
      DOM.on(link, 'click', () => this.close());
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!this.sideMenu.contains(e.target) && !this.menuBtn.contains(e.target)) {
        this.close();
      }
    });

    // Cerrar menú al hacer scroll
    window.addEventListener('scroll', () => this.close());
  },

  open() {
    DOM.addClass(this.sideMenu, 'active');
    DOM.setAttribute(this.menuBtn, 'aria-expanded', 'true');
  },

  close() {
    DOM.removeClass(this.sideMenu, 'active');
    DOM.setAttribute(this.menuBtn, 'aria-expanded', 'false');
  },

  toggle() {
    if (DOM.hasClass(this.sideMenu, 'active')) {
      this.close();
    } else {
      this.open();
    }
  }
};
