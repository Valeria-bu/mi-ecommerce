// =============================
// E-COMMERCE
// scripts.js
// =============================

// ---------- MENÚ LATERAL ----------
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const sideNavLinks = document.querySelectorAll(".side-nav a");

if (menuBtn && closeMenu && sideMenu) {

    menuBtn.addEventListener("click", () => {
        sideMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
        sideMenu.classList.remove("active");
    });

    // Cerrar menú al hacer clic en un enlace
    sideNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            sideMenu.classList.remove("active");
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener("click", (e) => {
        if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            sideMenu.classList.remove("active");
        }
    });

}

// ---------- CARRITO ----------
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contador = document.getElementById("cart-count");
const botonesAgregar = document.querySelectorAll(".add-cart");
const cartBtn = document.getElementById("cartBtn");

// Actualiza el número del badge
function actualizarContador() {

    if (contador) {
        contador.textContent = carrito.length;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar productos al carrito
function inicializarBotonesCarrito() {
    const botonesActualizados = document.querySelectorAll(".add-cart");
    
    botonesActualizados.forEach((boton) => {

        boton.addEventListener("click", () => {

            const producto = boton.parentElement;

            const nombre = producto.querySelector("h3").textContent;
            const precio = producto.querySelector("h4").textContent;

            carrito.push({
                nombre,
                precio
            });

            actualizarContador();

            mostrarMensaje(nombre);

        });

    });
}

// Mostrar mensaje de confirmación
function mostrarMensaje(nombreProducto) {

    const mensaje = document.createElement("div");

    mensaje.textContent = `${nombreProducto} agregado al carrito`;

    mensaje.style.position = "fixed";
    mensaje.style.bottom = "20px";
    mensaje.style.right = "20px";
    mensaje.style.background = "#4c2c57";
    mensaje.style.color = "#fff";
    mensaje.style.padding = "12px 18px";
    mensaje.style.borderRadius = "10px";
    mensaje.style.boxShadow = "0 4px 10px rgba(0,0,0,.3)";
    mensaje.style.zIndex = "9999";

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2000);

}

// Mostrar carrito al hacer clic en el icono
if (cartBtn) {
    cartBtn.addEventListener("click", () => {
        abrirModalCarrito();
    });
}

// Modal del Carrito
const cartModal = document.getElementById("cartModal");
const cartModalClose = document.querySelector(".cart-modal-close");
const clearCartBtn = document.getElementById("clearCartBtn");

// Abrir modal del carrito
function abrirModalCarrito() {
    actualizarModalCarrito();
    cartModal.classList.add("active");
}

// Cerrar modal del carrito
function cerrarModalCarrito() {
    cartModal.classList.remove("active");
}

// Actualizar contenido del modal
function actualizarModalCarrito() {
    const cartItems = document.getElementById("cartItems");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    
    if (carrito.length === 0) {
        cartEmpty.classList.add("visible");
        cartTotal.innerHTML = "<strong>Total: $0.00</strong>";
        return;
    } else {
        cartEmpty.classList.remove("visible");
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        const precio = parseFloat(producto.precio.replace("$", ""));
        total += precio;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${producto.nombre}</div>
                <div class="cart-item-price">${producto.precio}</div>
            </div>
            <button class="cart-item-remove" data-index="${index}">×</button>
        `;

        cartItems.appendChild(cartItem);
    });

    // Agregar listeners a botones de eliminar
    document.querySelectorAll(".cart-item-remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            actualizarContador();
            actualizarModalCarrito();
        });
    });

    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

// Event listeners del modal
if (cartModalClose) {
    cartModalClose.addEventListener("click", cerrarModalCarrito);
}

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        carrito = [];
        actualizarContador();
        actualizarModalCarrito();
    });
}

// Cerrar modal al hacer clic fuera
if (cartModal) {
    cartModal.addEventListener("click", (e) => {
        if (e.target === cartModal) {
            cerrarModalCarrito();
        }
    });
}

// Mostrar resumen del carrito
function mostrarResumenCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let resumen = "Productos en el carrito:\n\n";
    let total = 0;

    carrito.forEach((producto, index) => {
        const precio = parseFloat(producto.precio.replace("$", ""));
        resumen += `${index + 1}. ${producto.nombre} - ${producto.precio}\n`;
        total += precio;
    });

    resumen += `\nTotal: $${total.toFixed(2)}`;
    alert(resumen);
}

// Inicializar
actualizarContador();
inicializarBotonesCarrito();