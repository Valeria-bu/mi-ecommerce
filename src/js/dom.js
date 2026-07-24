// ==========================================
// DOM Utilities
// ==========================================

export const DOM = {
  /**
   * Selecciona un elemento por ID
   * @param {string} id - ID del elemento
   * @returns {Element|null}
   */
  byId: (id) => document.getElementById(id),

  /**
   * Selecciona todos los elementos por selector
   * @param {string} selector - Selector CSS
   * @returns {NodeList}
   */
  all: (selector) => document.querySelectorAll(selector),

  /**
   * Crea un elemento HTML
   * @param {string} tag - Etiqueta HTML
   * @param {object} attributes - Atributos del elemento
   * @param {string|HTMLElement} content - Contenido
   * @returns {HTMLElement}
   */
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

  /**
   * Añade una clase a un elemento
   * @param {Element} element - Elemento
   * @param {string} className - Clase
   */
  addClass: (element, className) => {
    if (element) element.classList.add(className);
  },

  /**
   * Elimina una clase de un elemento
   * @param {Element} element - Elemento
   * @param {string} className - Clase
   */
  removeClass: (element, className) => {
    if (element) element.classList.remove(className);
  },

  /**
   * Alterna una clase en un elemento
   * @param {Element} element - Elemento
   * @param {string} className - Clase
   */
  toggleClass: (element, className) => {
    if (element) element.classList.toggle(className);
  },

  /**
   * Verifica si un elemento tiene una clase
   * @param {Element} element - Elemento
   * @param {string} className - Clase
   * @returns {boolean}
   */
  hasClass: (element, className) => {
    if (!element) return false;
    return element.classList.contains(className);
  },

  /**
   * Añade evento a un elemento
   * @param {Element} element - Elemento
   * @param {string} event - Tipo de evento
   * @param {Function} callback - Función callback
   */
  on: (element, event, callback) => {
    if (element) element.addEventListener(event, callback);
  },

  /**
   * Elimina evento de un elemento
   * @param {Element} element - Elemento
   * @param {string} event - Tipo de evento
   * @param {Function} callback - Función callback
   */
  off: (element, event, callback) => {
    if (element) element.removeEventListener(event, callback);
  },

  /**
   * Establece el contenido HTML de un elemento
   * @param {Element} element - Elemento
   * @param {string} html - HTML
   */
  setHTML: (element, html) => {
    if (element) element.innerHTML = html;
  },

  /**
   * Obtiene el contenido de texto de un elemento
   * @param {Element} element - Elemento
   * @returns {string}
   */
  getText: (element) => {
    return element ? element.textContent : '';
  },

  /**
   * Establece el contenido de texto de un elemento
   * @param {Element} element - Elemento
   * @param {string} text - Texto
   */
  setText: (element, text) => {
    if (element) element.textContent = text;
  },

  /**
   * Obtiene un atributo de un elemento
   * @param {Element} element - Elemento
   * @param {string} attribute - Atributo
   * @returns {string|null}
   */
  getAttribute: (element, attribute) => {
    return element ? element.getAttribute(attribute) : null;
  },

  /**
   * Establece un atributo en un elemento
   * @param {Element} element - Elemento
   * @param {string} attribute - Atributo
   * @param {string} value - Valor
   */
  setAttribute: (element, attribute, value) => {
    if (element) element.setAttribute(attribute, value);
  },

  /**
   * Delega evento en elemento padre
   * @param {Element} parent - Elemento padre
   * @param {string} selector - Selector del elemento
   * @param {string} event - Tipo de evento
   * @param {Function} callback - Función callback
   */
  delegate: (parent, selector, event, callback) => {
    if (!parent) return;
    
    parent.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target) callback.call(target, e);
    });
  }
};
