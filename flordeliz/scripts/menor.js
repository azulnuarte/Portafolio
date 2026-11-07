document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("categorias-container");
  const cargando = document.getElementById("cargando-productos");
  const sinResultados = document.getElementById("sin-resultados");
  const buscador = document.getElementById("buscadorProductos");

    try {
    const data = await cargarCatalogo();
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
<img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" onerror="this.onerror=null; this.src='images/productos/sin-imagen.png'">          <h3>${producto.nombre}</h3>
          ${producto.contenido ? `<p class="producto-contenido">${producto.contenido}</p>` : ""}
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

// ===== CATÁLOGO DESDE GOOGLE SHEETS =====
// Pegar este bloque al FINAL de tu archivo JS (después de agregarAlCarrito).
 
// Pegá acá el link que te da Google Sheets (Archivo > Compartir > Publicar en la web > CSV)
const URL_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEfcbrfPCFo_4319lauxm5HkkWrFDCRvD3tzQY0txL91aincfRNlyxd0ZEUFtyEffPiD_LT8haNmkh/pub?output=csv";
 
// Imagen que se muestra cuando un producto todavía no tiene foto
const IMAGEN_POR_DEFECTO = "images/productos/sin-imagen.png";
 
async function cargarCatalogo() {
  try {
    if (!URL_SHEET.startsWith("http")) throw new Error("Falta el link de la planilla");
    const resp = await fetch(URL_SHEET);
    if (!resp.ok) throw new Error("No se pudo leer la planilla");
    const filas = parsearCSV(await resp.text());
    const catalogo = filasACatalogo(filas);
    console.log("Leído desde Google Sheets:", Object.keys(catalogo).length, "categorías");
    if (Object.keys(catalogo).length === 0) throw new Error("La planilla está vacía");
    return catalogo;
  } catch (err) {
    console.warn("Se usa menor.json como respaldo:", err);
    const resp = await fetch("menor.json");
    if (!resp.ok) throw new Error("No se pudo cargar el catálogo");
    return resp.json();
  }
}
 
// Convierte el texto CSV en una lista de filas (maneja comillas y comas dentro de los textos)
function parsearCSV(texto) {
  const filas = [];
  let fila = [], campo = "", entreComillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (entreComillas) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') entreComillas = false;
      else campo += c;
    } else if (c === '"') {
      entreComillas = true;
    } else if (c === ",") {
      fila.push(campo); campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(campo); campo = "";
      filas.push(fila); fila = [];
    } else {
      campo += c;
    }
  }
  if (campo !== "" || fila.length) { fila.push(campo); filas.push(fila); }
  return filas;
}
 
// Acepta "23950", "23.950", "$ 23.950" o "23.950,00" y devuelve "23.950"
function formatearPrecio(valor) {
  let s = String(valor || "").replace(/[$\s]/g, "");
  if (!s) return "";
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const n = parseFloat(s);
  return isNaN(n) ? "" : Math.round(n).toLocaleString("es-AR");
}
 
// Agrupa las filas por categoría y producto, con el mismo formato que tenía menor.json
function filasACatalogo(filas) {
  if (filas.length < 2) return {};
  const cols = filas[0].map(h => h.trim().toLowerCase());
  const col = nombre => cols.indexOf(nombre);
  const iCat = col("categoria"), iNom = col("nombre"), iCon = col("contenido"),
        iPre = col("presentacion"), iPrecio = col("precio"), iImg = col("imagen");
 
  const catalogo = {};
  const productos = new Map();
 
  for (const f of filas.slice(1)) {
    const nombre = (f[iNom] || "").trim();
    if (!nombre) continue;
    const categoria = (f[iCat] || "Otros").trim();
    const clave = categoria + "||" + nombre;
 
    if (!productos.has(clave)) {
      const imagen = (f[iImg] || "").trim();
      const producto = {
        nombre,
        contenido: iCon >= 0 ? (f[iCon] || "").trim() : "",
        presentaciones: [],
        imagen: !imagen || /insertar/i.test(imagen) ? IMAGEN_POR_DEFECTO : imagen
      };
      productos.set(clave, producto);
      (catalogo[categoria] ||= []).push(producto);
    }
 
    const presentacion = (f[iPre] || "").trim();
    const precio = formatearPrecio(f[iPrecio]);
    if (presentacion && precio) {
      productos.get(clave).presentaciones.push(`${presentacion} - $${precio}`);
    }
  }
  return catalogo;
}
