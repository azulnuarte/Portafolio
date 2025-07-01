document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("menor.json"); // ✔ esta es la ruta correcta
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo menor.json");
    }

    const data = await response.json();
    const main = document.querySelector("main");

    for (const categoria in data) {
      // Título de categoría
      const titulo = document.createElement("h2");
      titulo.textContent = categoria;
      titulo.classList.add("categoria-titulo");
      main.appendChild(titulo);

      const contenedor = document.createElement("div");
      contenedor.classList.add("categoria-contenedor");

      data[categoria].forEach(producto => {
        const card = document.createElement("section");
        card.classList.add("producto");

        card.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <ul>
            ${producto.presentaciones.map(p => `<li>${p}</li>`).join("")}
          </ul>
        `;

        contenedor.appendChild(card);
      });

      main.appendChild(contenedor);
    }
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
});

