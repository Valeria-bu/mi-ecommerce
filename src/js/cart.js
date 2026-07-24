// ==========================================
// Cart Module
// ==========================================

import { DOM } from './dom.js';

export const Cart = {
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
    // Abrir carrito
    DOM.on(this.cartBtn, 'click', () => this.openModal());

    // Cerrar carrito
    this.modalClose.forEach(btn => {
      DOM.on(btn, 'click', () => this.closeModal());
    });

    // Cerrar al hacer clic fuera
    DOM.on(this.cartModal, 'click', (e) => {
      if (e.target === this.cartModal) {
        this.closeModal();
      }
    });

    // Vaciar carrito
    DOM.on(this.clearCartBtn, 'click', () => this.clear());

    // Agregar al carrito
    this.addCartButtons.forEach(btn => {
      DOM.on(btn, 'click', (e) => this.addProduct(e.target));
    });

    // Cerrar modal con tecla ESC
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

    // Agregar listeners a botones de eliminar
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
