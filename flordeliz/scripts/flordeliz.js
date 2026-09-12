/* =========================================================
   MENÚ HAMBURGUESA
   ========================================================= */
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animateme');

if (hamburgerElement && navElement) {
  hamburgerElement.addEventListener('click', () => {
    const abierto = navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
    hamburgerElement.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });

  // cierra el menú al tocar un link (importante en celular)
  document.querySelectorAll('.menuLinks a').forEach(link => {
    link.addEventListener('click', () => {
      navElement.classList.remove('open');
      hamburgerElement.classList.remove('open');
      hamburgerElement.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========================================================
   CONTADOR DE PEDIDO (se usa en las 3 páginas)
   ========================================================= */
function actualizarContadorCarrito() {
  const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = carrito.length > 0 ? `(${carrito.length})` : "";
  }
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

/* =========================================================
   TOAST — aviso pequeño y no bloqueante (reemplaza los alert())
   ========================================================= */
function mostrarToast(mensaje) {
  let toast = document.getElementById("toast-global");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-global";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.classList.add("visible");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2000);
}
