// ==========================================
// Smooth Scroll Module
// ==========================================

import { DOM } from './dom.js';

export const SmoothScroll = {
  init() {
    this.setupSmoothScroll();
  },

  setupSmoothScroll() {
    DOM.all('a[href^="#"]').forEach(link => {
      DOM.on(link, 'click', (e) => {
        const href = DOM.getAttribute(link, 'href');
        if (href === '#') return;

        e.preventDefault();
        const target = DOM.byId(href.substring(1));

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
};
