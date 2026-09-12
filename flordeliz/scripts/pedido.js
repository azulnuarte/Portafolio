const numeroWhatsapp = "5492616626634";
let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

function guardarCarrito() {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  if (typeof actualizarContadorCarrito === "function") actualizarContadorCarrito();
}

function renderCarrito() {
  const detalleDiv = document.getElementById("detallePedido");
  const totalSpan = document.getElementById("totalPedido");
  const botonEnviar = document.querySelector('#pedidoForm button[type="submit"]');

  if (carrito.length === 0) {
    detalleDiv.innerHTML = `<p class="carrito-vacio">Todavía no agregaste productos. <a href="menor.html">Ver catálogo</a></p>`;
    if (botonEnviar) botonEnviar.disabled = true;
  } else {
    detalleDiv.innerHTML = carrito.map((item, indice) => `
      <div class="fila-producto">
        <span>${item.presentacion} ${item.producto} - $${item.precio}</span>
        <button type="button" data-indice="${indice}" class="quitar-item">Quitar</button>
      </div>
    `).join("");

    detalleDiv.querySelectorAll(".quitar-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const indice = Number(btn.dataset.indice);
        carrito.splice(indice, 1);
        guardarCarrito();
        renderCarrito();
      });
    });

    if (botonEnviar) botonEnviar.disabled = false;
  }

  const total = carrito.reduce((sum, item) => sum + Number(item.precio.replace(/\./g, "")), 0);
  totalSpan.textContent = total.toLocaleString("es-AR");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCarrito();

  const form = document.getElementById("pedidoForm");
  const confirmacion = document.getElementById("pedidoConfirmacion");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (carrito.length === 0) return;

    const nombre = document.getElementById("nombreCliente").value.trim();
    const total = carrito.reduce((sum, item) => sum + Number(item.precio.replace(/\./g, "")), 0);

    const mensaje = `*Pedido Flor de Lis*
Nombre: ${nombre}
${carrito.map(item => `- ${item.presentacion} ${item.producto} ($${item.precio})`).join("\n")}
Total: $${total.toLocaleString("es-AR")}`;

    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    // limpiamos el pedido después de enviarlo
    carrito = [];
    guardarCarrito();
    renderCarrito();
    form.reset();
    confirmacion.textContent = "¡Pedido enviado! Te vamos a contactar por WhatsApp para confirmarlo.";
  });
});
