document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("menor.json");
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo menor.json");
    }

    const data = await response.json();
    const main = document.querySelector("main");

    for (const categoria in data) {
      const card = document.createElement("section");
      card.classList.add("categoria-card");

      const header = document.createElement("div");
      header.classList.add("categoria-header");
      header.textContent = categoria;

      const contenido = document.createElement("div");
      contenido.classList.add("categoria-contenido");

      // Cargar productos de la categoría
      data[categoria].forEach(producto => {
        const productoCard = document.createElement("div");
        productoCard.classList.add("producto");

        productoCard.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <ul>
            ${producto.presentaciones.map(p => `<li>${p}</li>`).join("")}
          </ul>
        `;

        contenido.appendChild(productoCard);
      });

      // Ocultar contenido al inicio
contenido.classList.add("oculto");

// Toggle: abrir/cerrar al hacer clic en el header
header.addEventListener("click", () => {
  contenido.classList.toggle("oculto");
  card.classList.toggle("abierta");
});


      card.appendChild(header);
      card.appendChild(contenido);
      main.appendChild(card);
    }
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
});





