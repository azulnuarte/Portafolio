document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("categorias-container");
  const cargando = document.getElementById("cargando-productos");
  const sinResultados = document.getElementById("sin-resultados");
  const buscador = document.getElementById("buscadorProductos");

  try {
    const response = await fetch("menor.json");
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo menor.json");
    }

    const data = await response.json();
    cargando.style.display = "none";

    for (const categoria in data) {
      const card = document.createElement("section");
      card.classList.add("categoria-card");

      const header = document.createElement("div");
      header.classList.add("categoria-header");
      header.textContent = categoria;

      const contenido = document.createElement("div");
      contenido.classList.add("categoria-contenido", "oculto"); // oculto al inicio

      // Cargar productos de la categoría
      data[categoria].forEach(producto => {
        const productoCard = document.createElement("div");
        productoCard.classList.add("producto");
        productoCard.dataset.nombre = producto.nombre.toLowerCase();

        productoCard.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
          <h3>${producto.nombre}</h3>
          <ul>
            ${producto.presentaciones.map(p => {
              const [cantidad, precioStr] = p.split(" - $");
              return `
                <li>${cantidad} - $${precioStr}
                  <button type="button" onclick="agregarAlCarrito('${producto.nombre.replace(/'/g, "\\'")}', '${precioStr}', '${cantidad}')">
                    Agregar
                  </button>
                </li>
              `;
            }).join("")}
          </ul>
        `;

        contenido.appendChild(productoCard);
      });

      // Toggle: abrir/cerrar al hacer clic en el header
      header.addEventListener("click", () => {
        contenido.classList.toggle("oculto");
        card.classList.toggle("abierta");
      });

      card.appendChild(header);
      card.appendChild(contenido);
      contenedor.appendChild(card);
    }

    // Buscador: filtra productos por nombre y abre la categoría que tenga coincidencias
    if (buscador) {
      buscador.addEventListener("input", (e) => {
        const texto = e.target.value.trim().toLowerCase();
        let huboCoincidencias = false;

        document.querySelectorAll(".categoria-card").forEach(card => {
          let algunoVisible = false;

          card.querySelectorAll(".producto").forEach(prod => {
            const coincide = !texto || prod.dataset.nombre.includes(texto);
            prod.style.display = coincide ? "" : "none";
            if (coincide) algunoVisible = true;
          });

          if (texto) {
            card.style.display = algunoVisible ? "" : "none";
            if (algunoVisible) {
              card.classList.add("abierta");
              card.querySelector(".categoria-contenido").classList.remove("oculto");
              huboCoincidencias = true;
            }
          } else {
            // buscador vacío: vuelve todo a su estado original (cerrado)
            card.style.display = "";
            card.classList.remove("abierta");
            card.querySelector(".categoria-contenido").classList.add("oculto");
          }
        });

        sinResultados.style.display = (texto && !huboCoincidencias) ? "block" : "none";
      });
    }
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    cargando.textContent = "No se pudieron cargar los productos. Probá recargar la página.";
  }
});

function agregarAlCarrito(producto, precio, presentacion) {
  let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
  carrito.push({ producto, precio, presentacion });
  sessionStorage.setItem("carrito", JSON.stringify(carrito));

  if (typeof actualizarContadorCarrito === "function") actualizarContadorCarrito();
  if (typeof mostrarToast === "function") {
    mostrarToast("Agregado al pedido ✓");
  } else {
    alert("Producto agregado al pedido");
  }
}
