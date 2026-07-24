// ==========================================
// DOM Utilities
// ==========================================

const DOM = {
  byId: (id) => document.getElementById(id),
  all: (selector) => document.querySelectorAll(selector),
  create: (tag, attributes = {}, content = '') => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'class') {
        element.className = value;
      } else if (key === 'data') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });
    if (typeof content === 'string') {
      element.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      element.appendChild(content);
    }
    return element;
  },
  addClass: (element, className) => {
    if (element) element.classList.add(className);
  },
  removeClass: (element, className) => {
    if (element) element.classList.remove(className);
  },
  toggleClass: (element, className) => {
    if (element) element.classList.toggle(className);
  },
  hasClass: (element, className) => {
    if (!element) return false;
    return element.classList.contains(className);
  },
  on: (element, event, callback) => {
    if (element) element.addEventListener(event, callback);
  },
  off: (element, event, callback) => {
    if (element) element.removeEventListener(event, callback);
  },
  setHTML: (element, html) => {
    if (element) element.innerHTML = html;
  },
  getText: (element) => {
    return element ? element.textContent : '';
  },
  setText: (element, text) => {
    if (element) element.textContent = text;
  },
  getAttribute: (element, attribute) => {
    return element ? element.getAttribute(attribute) : null;
  },
  setAttribute: (element, attribute, value) => {
    if (element) element.setAttribute(attribute, value);
  },
  delegate: (parent, selector, event, callback) => {
    if (!parent) return;
    parent.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target) callback.call(target, e);
    });
  }
};

// ==========================================
// Menu Module
// ==========================================

const Menu = {
  menuBtn: DOM.byId('menuBtn'),
  closeBtn: DOM.byId('closeMenu'),
  sideMenu: DOM.byId('sideMenu'),
  sideNavLinks: DOM.all('.side-menu__nav-link'),

  init() {
    if (!this.menuBtn || !this.closeBtn || !this.sideMenu) return;
    this.setupEventListeners();
  },

  setupEventListeners() {
    DOM.on(this.menuBtn, 'click', () => this.open());
    DOM.on(this.closeBtn, 'click', () => this.close());
    this.sideNavLinks.forEach(link => {
      DOM.on(link, 'click', () => this.close());
    });
    document.addEventListener('click', (e) => {
      if (!this.sideMenu.contains(e.target) && !this.menuBtn.contains(e.target)) {
        this.close();
      }
    });
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

// ==========================================
// Cart Module
// ==========================================

const Cart = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  countBadge: DOM.byId('cart-count'),
  cartBtn: DOM.byId('cartBtn'),
  cartModal: DOM.byId('cartModal'),
  cartItemsContainer: DOM.byId('cartItems'),
  cartEmpty: DOM.byId('cartEmpty'),
  cartTotal: DOM.byId('cartTotal'),
  clearCartBtn: DOM.byId('clearCartBtn'),
  modalClose: DOM.all('.modal__close'),
  addCartButtons: DOM.all('.add-cart'),

  init() {
    this.updateBadge();
    this.setupEventListeners();
  },

  setupEventListeners() {
    DOM.on(this.cartBtn, 'click', () => this.openModal());
    this.modalClose.forEach(btn => {
      DOM.on(btn, 'click', () => this.closeModal());
    });
    DOM.on(this.cartModal, 'click', (e) => {
      if (e.target === this.cartModal) {
        this.closeModal();
      }
    });
    DOM.on(this.clearCartBtn, 'click', () => this.clear());
    this.addCartButtons.forEach(btn => {
      DOM.on(btn, 'click', (e) => this.addProduct(e.target));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  },

  addProduct(button) {
    const productCard = button.closest('.product-card');
    if (!productCard) return;
    const name = DOM.getText(productCard.querySelector('.product-card__title'));
    const price = DOM.getText(productCard.querySelector('.product-card__price'));
    this.items.push({ name, price });
    this.updateBadge();
    this.save();
    this.showNotification(`${name} agregado al carrito`);
  },

  removeProduct(index) {
    this.items.splice(index, 1);
    this.updateBadge();
    this.updateModal();
    this.save();
  },

  clear() {
    if (confirm('¿Estás seguro que quieres vaciar el carrito?')) {
      this.items = [];
      this.updateBadge();
      this.updateModal();
      this.save();
    }
  },

  updateBadge() {
    if (this.countBadge) {
      DOM.setText(this.countBadge, this.items.length);
    }
  },

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },

  openModal() {
    this.updateModal();
    DOM.addClass(this.cartModal, 'active');
    DOM.setAttribute(this.cartModal, 'aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    DOM.removeClass(this.cartModal, 'active');
    DOM.setAttribute(this.cartModal, 'aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  },

  updateModal() {
    if (this.items.length === 0) {
      DOM.addClass(this.cartEmpty, 'visible');
      DOM.setHTML(this.cartItemsContainer, '');
      DOM.setHTML(this.cartTotal, '<strong>Total: $0.00</strong>');
      return;
    }
    DOM.removeClass(this.cartEmpty, 'visible');
    let total = 0;
    let html = '';
    this.items.forEach((item, index) => {
      const price = parseFloat(item.price.replace('$', ''));
      total += price;
      html += `
        <div class="cart-item">
          <div class="cart-item__info">
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__price">${item.price}</div>
          </div>
          <button class="cart-item__remove" data-index="${index}" aria-label="Eliminar ${item.name}">×</button>
        </div>
      `;
    });
    DOM.setHTML(this.cartItemsContainer, html);
    document.querySelectorAll('.cart-item__remove').forEach(btn => {
      DOM.on(btn, 'click', (e) => {
        const index = DOM.getAttribute(e.target, 'data-index');
        this.removeProduct(parseInt(index));
      });
    });
    DOM.setHTML(this.cartTotal, `<strong>Total: $${total.toFixed(2)}</strong>`);
  },

  showNotification(message) {
    const notification = DOM.create('div', {
      class: 'notification',
      role: 'status',
      'aria-live': 'polite'
    }, message);
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#4c2c57',
      color: '#fff',
      padding: '12px 18px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,.3)',
      zIndex: '9999',
      animation: 'slideIn 0.3s ease-out'
    });
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }
};

// ==========================================
// Smooth Scroll Module
// ==========================================

const SmoothScroll = {
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

// ==========================================
// Initialize App
// ==========================================

function initApp() {
  console.log('🚀 Inicializando aplicación...');
  Menu.init();
  Cart.init();
  SmoothScroll.init();
  console.log('✅ Aplicación iniciada correctamente');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

window.App = {
  Menu,
  Cart,
  SmoothScroll
};
